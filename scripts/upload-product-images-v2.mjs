import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script MELHORADO para fazer upload de imagens dos produtos no Shopify
 *
 * Usa Staged Uploads (método recomendado pela Shopify)
 * Mais eficiente para múltiplas imagens
 *
 * Como usar:
 * 1. Configure SHOPIFY_ACCESS_TOKEN abaixo
 * 2. Execute: node scripts/upload-product-images-v2.mjs
 */

// ============================================
// CONFIGURAÇÃO DA SHOPIFY API
// ============================================
const SHOPIFY_STORE = 'djjrjm-0p.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = 'SUA_API_KEY_AQUI'; // ← Cole seu token aqui

// Mapeamento de categorias
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

async function shopifyRequest(query, variables = {}) {
  const response = await fetch(`https://${SHOPIFY_STORE}/admin/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN
    },
    body: JSON.stringify({ query, variables })
  });

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
  }

  return data;
}

// Busca produto por handle
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

  const data = await shopifyRequest(query, { handle });
  return data?.data?.product || null;
}

// Cria staged upload para múltiplas imagens
async function createStagedUploads(filenames) {
  const mutation = `
    mutation GenerateStagedUploads($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets {
          url
          resourceUrl
          parameters {
            name
            value
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const input = filenames.map(filename => ({
    filename: path.basename(filename),
    mimeType: `image/${path.extname(filename).slice(1)}`,
    resource: 'PRODUCT_IMAGE',
    httpMethod: 'POST'
  }));

  const data = await shopifyRequest(mutation, { input });

  if (data?.data?.stagedUploadsCreate?.userErrors?.length > 0) {
    throw new Error(data.data.stagedUploadsCreate.userErrors[0].message);
  }

  return data?.data?.stagedUploadsCreate?.stagedTargets || [];
}

// Faz upload do arquivo para URL staged
async function uploadToStaged(stagedTarget, filePath) {
  const formData = new FormData();

  // Adiciona parâmetros do staged upload
  stagedTarget.parameters.forEach(param => {
    formData.append(param.name, param.value);
  });

  // Adiciona o arquivo
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: `image/${path.extname(filePath).slice(1)}` });
  formData.append('file', blob, path.basename(filePath));

  const response = await fetch(stagedTarget.url, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  return stagedTarget.resourceUrl;
}

// Adiciona imagens ao produto
async function addImagesToProduct(productId, imageUrls) {
  const mutation = `
    mutation ProductCreateMedia($media: [CreateMediaInput!]!, $productId: ID!) {
      productCreateMedia(media: $media, productId: $productId) {
        media {
          ... on MediaImage {
            id
            image {
              url
            }
          }
        }
        mediaUserErrors {
          field
          message
        }
        product {
          id
        }
      }
    }
  `;

  const media = imageUrls.map(url => ({
    mediaContentType: 'IMAGE',
    originalSource: url
  }));

  const data = await shopifyRequest(mutation, { productId, media });

  if (data?.data?.productCreateMedia?.mediaUserErrors?.length > 0) {
    throw new Error(data.data.productCreateMedia.mediaUserErrors[0].message);
  }

  return data?.data?.productCreateMedia?.media || [];
}

// ============================================
// FUNÇÃO PRINCIPAL
// ============================================

async function uploadAllImages() {
  console.log('🚀 Iniciando upload de imagens...\n');
  console.log('='.repeat(70));
  console.log('📸 UPLOAD DE IMAGENS PARA PRODUTOS SHOPIFY');
  console.log('Método: Staged Uploads (Recomendado pela Shopify)');
  console.log('='.repeat(70) + '\n');

  const leaguesPath = path.join(__dirname, '../../Leagues');
  let totalProducts = 0;
  let totalImages = 0;
  let errors = 0;
  let skipped = 0;

  // Processa cada categoria
  for (const [categoryFolder, categoryTag] of Object.entries(CATEGORIES)) {
    const categoryPath = path.join(leaguesPath, categoryFolder);

    if (!fs.existsSync(categoryPath)) {
      console.log(`⚠️  Pasta não encontrada: ${categoryFolder}\n`);
      continue;
    }

    const products = fs.readdirSync(categoryPath);
    console.log(`\n📦 Processando ${categoryFolder}: ${products.length} produtos\n`);

    for (const productName of products) {
      const productPath = path.join(categoryPath, productName);
      const stats = fs.statSync(productPath);

      if (!stats.isDirectory()) continue;

      totalProducts++;
      const handle = generateHandle(productName, categoryTag);

      try {
        // Busca produto no Shopify
        console.log(`   📄 "${productName}"`);
        console.log(`      Handle: ${handle}`);

        const product = await getProductByHandle(handle);

        if (!product) {
          console.log(`      ⚠️  Produto não encontrado no Shopify\n`);
          skipped++;
          continue;
        }

        // Verifica se já tem imagens
        const existingImages = product.images?.edges?.length || 0;
        if (existingImages > 0) {
          console.log(`      ⏭️  Já tem ${existingImages} imagens, pulando...\n`);
          skipped++;
          continue;
        }

        // Lista imagens da pasta
        const files = fs.readdirSync(productPath);
        const imageFiles = files
          .filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i))
          .sort()
          .map(f => path.join(productPath, f));

        if (imageFiles.length === 0) {
          console.log(`      ⚠️  Nenhuma imagem encontrada\n`);
          continue;
        }

        console.log(`      📸 Fazendo upload de ${imageFiles.length} imagens...`);

        // 1. Cria staged uploads
        const stagedTargets = await createStagedUploads(imageFiles);

        // 2. Faz upload de cada arquivo
        const uploadedUrls = [];
        for (let i = 0; i < imageFiles.length; i++) {
          const resourceUrl = await uploadToStaged(stagedTargets[i], imageFiles[i]);
          uploadedUrls.push(resourceUrl);
          console.log(`         ${i + 1}/${imageFiles.length} ✓ ${path.basename(imageFiles[i])}`);
        }

        // 3. Adiciona imagens ao produto
        await addImagesToProduct(product.id, uploadedUrls);
        totalImages += imageFiles.length;

        console.log(`      ✅ ${imageFiles.length} imagens adicionadas!\n`);

        // Delay para respeitar rate limit
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (err) {
        console.log(`      ❌ Erro: ${err.message}\n`);
        errors++;
      }
    }
  }

  // Relatório final
  console.log('\n' + '='.repeat(70));
  console.log('✅ UPLOAD CONCLUÍDO!');
  console.log('='.repeat(70));
  console.log(`📊 Produtos processados: ${totalProducts}`);
  console.log(`📸 Imagens enviadas: ${totalImages}`);
  console.log(`⏭️  Pulados (já tinham imagens): ${skipped}`);
  console.log(`❌ Erros: ${errors}`);
  console.log('='.repeat(70) + '\n');
}

// ============================================
// VALIDAÇÃO E EXECUÇÃO
// ============================================

if (!SHOPIFY_ACCESS_TOKEN || SHOPIFY_ACCESS_TOKEN === 'SUA_API_KEY_AQUI') {
  console.error('❌ ERRO: Configure o SHOPIFY_ACCESS_TOKEN antes de executar!\n');
  console.error('Para obter um access token:');
  console.error('1. Acesse: https://djjrjm-0p.myshopify.com/admin/settings/apps/development');
  console.error('2. Use o Custom App existente ou crie um novo');
  console.error('3. Habilite as permissões: write_products, read_products');
  console.error('4. Copie o Admin API access token');
  console.error('5. Cole na linha 23 deste script\n');
  process.exit(1);
}

// Executa
uploadAllImages().catch(err => {
  console.error('❌ Erro fatal:', err);
  process.exit(1);
});
