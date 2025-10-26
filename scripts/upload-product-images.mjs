import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script para fazer upload de imagens dos produtos no Shopify
 *
 * IMPORTANTE: Execute este script DEPOIS de importar o CSV de produtos
 *
 * Como usar:
 * 1. Configure suas credenciais da Shopify Admin API
 * 2. Importe o CSV de produtos primeiro
 * 3. Execute: node scripts/upload-product-images.mjs
 */

// ============================================
// CONFIGURAÇÃO DA SHOPIFY API
// ============================================
const SHOPIFY_STORE = 'djjrjm-0p.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = 'SUA_API_KEY_AQUI'; // Adicionar Admin API access token

// Mapeamento de categorias (mesmo do generate-full-csv.mjs)
const CATEGORIES = {
  'Albums belong to Brazil team column': 'brazil',
  'Albums belong to Corinthians': 'corinthians',
  'Albums belong to Flamengo': 'flamengo',
  'Albums belong to National Teams': 'national-teams',
  'Albums belong to Palmeiras': 'palmeiras',
  'Albums belong to Santos': 'santos'
};

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

// Gera o mesmo handle usado no CSV
function generateHandle(productName, categoryTag) {
  let handle = productName
    .toLowerCase()
    .replace(/\(size [s-x]+\)/gi, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return `${categoryTag}-${handle}`;
}

// Busca produto no Shopify por handle
async function getProductByHandle(handle) {
  const query = `
    query GetProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        images(first: 10) {
          edges {
            node {
              id
              src
            }
          }
        }
      }
    }
  `;

  const response = await fetch(`https://${SHOPIFY_STORE}/admin/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query,
      variables: { handle }
    })
  });

  const data = await response.json();
  return data?.data?.product || null;
}

// Faz upload de imagem para o produto
async function uploadProductImage(productId, imageFile) {
  const imageData = fs.readFileSync(imageFile);
  const base64Image = imageData.toString('base64');
  const extension = path.extname(imageFile).toLowerCase().replace('.', '');

  const mutation = `
    mutation CreateProductImage($productId: ID!, $image: [CreateMediaInput!]!) {
      productCreateMedia(productId: $productId, media: $image) {
        media {
          ... on MediaImage {
            id
            image {
              src
            }
          }
        }
        mediaUserErrors {
          field
          message
        }
      }
    }
  `;

  const response = await fetch(`https://${SHOPIFY_STORE}/admin/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        productId,
        image: [{
          mediaContentType: 'IMAGE',
          originalSource: `data:image/${extension};base64,${base64Image}`
        }]
      }
    })
  });

  const data = await response.json();

  if (data?.data?.productCreateMedia?.mediaUserErrors?.length > 0) {
    throw new Error(data.data.productCreateMedia.mediaUserErrors[0].message);
  }

  return data?.data?.productCreateMedia?.media?.[0] || null;
}

// ============================================
// FUNÇÃO PRINCIPAL
// ============================================

async function uploadAllImages() {
  console.log('🚀 Iniciando upload de imagens...\n');

  const leaguesPath = path.join(__dirname, '../../Leagues');
  let totalProducts = 0;
  let totalImages = 0;
  let errors = 0;

  // Processa cada categoria
  for (const [categoryFolder, categoryTag] of Object.entries(CATEGORIES)) {
    const categoryPath = path.join(leaguesPath, categoryFolder);

    if (!fs.existsSync(categoryPath)) {
      console.log(`⚠️  Pasta não encontrada: ${categoryFolder}`);
      continue;
    }

    const products = fs.readdirSync(categoryPath);
    console.log(`\n📦 Processando ${categoryFolder}: ${products.length} produtos\n`);

    for (const productName of products) {
      const productPath = path.join(categoryPath, productName);
      const stats = fs.statSync(productPath);

      if (!stats.isDirectory()) continue;

      totalProducts++;

      // Gera handle do produto
      const handle = generateHandle(productName, categoryTag);

      try {
        // Busca produto no Shopify
        console.log(`   📄 Buscando: ${handle}...`);
        const product = await getProductByHandle(handle);

        if (!product) {
          console.log(`   ⚠️  Produto não encontrado no Shopify: ${handle}`);
          errors++;
          continue;
        }

        // Lista imagens da pasta
        const files = fs.readdirSync(productPath);
        const imageFiles = files
          .filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i))
          .sort(); // Ordena alfabeticamente

        if (imageFiles.length === 0) {
          console.log(`   ⚠️  Nenhuma imagem encontrada em: ${productName}`);
          continue;
        }

        console.log(`   📸 Fazendo upload de ${imageFiles.length} imagens...`);

        // Upload de cada imagem
        for (const imageFile of imageFiles) {
          const imagePath = path.join(productPath, imageFile);

          try {
            await uploadProductImage(product.id, imagePath);
            totalImages++;
            console.log(`      ✅ ${imageFile}`);

            // Delay para não ultrapassar rate limit da API
            await new Promise(resolve => setTimeout(resolve, 500));
          } catch (err) {
            console.log(`      ❌ Erro ao fazer upload de ${imageFile}: ${err.message}`);
            errors++;
          }
        }

      } catch (err) {
        console.log(`   ❌ Erro ao processar ${productName}: ${err.message}`);
        errors++;
      }
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ Upload concluído!');
  console.log(`📊 Produtos processados: ${totalProducts}`);
  console.log(`📸 Imagens enviadas: ${totalImages}`);
  console.log(`❌ Erros: ${errors}`);
  console.log('='.repeat(50));
}

// ============================================
// VALIDAÇÃO E EXECUÇÃO
// ============================================

if (!SHOPIFY_ACCESS_TOKEN || SHOPIFY_ACCESS_TOKEN === 'SUA_API_KEY_AQUI') {
  console.error('❌ ERRO: Configure o SHOPIFY_ACCESS_TOKEN antes de executar!');
  console.error('\nPara obter um access token:');
  console.error('1. Acesse: https://djjrjm-0p.myshopify.com/admin/settings/apps/development');
  console.error('2. Crie um Custom App');
  console.error('3. Habilite as permissões: write_products, read_products');
  console.error('4. Copie o Admin API access token');
  console.error('5. Cole na variável SHOPIFY_ACCESS_TOKEN deste script\n');
  process.exit(1);
}

// Executa
uploadAllImages().catch(err => {
  console.error('❌ Erro fatal:', err);
  process.exit(1);
});
