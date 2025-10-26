import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script SIMPLES para upload de imagens usando REST API
 *
 * Como usar:
 * 1. Configure SHOPIFY_ACCESS_TOKEN abaixo
 * 2. Execute: node scripts/upload-images-simple.mjs
 */

// ============================================
// CONFIGURAÇÃO
// ============================================
const SHOPIFY_STORE = 'djjrjm-0p.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = ''; // ← Cole seu Admin API access token aqui

const CATEGORIES = {
  'Albums belong to Brazil team column': 'brazil',
  'Albums belong to Corinthians': 'corinthians',
  'Albums belong to Flamengo': 'flamengo',
  'Albums belong to National Teams': 'national-teams',
  'Albums belong to Palmeiras': 'palmeiras',
  'Albums belong to Santos': 'santos'
};

// ============================================
// FUNÇÕES
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

// GraphQL para buscar produto
async function getProductByHandle(handle) {
  const query = `
    query {
      products(first: 1, query: "handle:${handle}") {
        edges {
          node {
            id
            legacyResourceId
            handle
            title
            images(first: 1) {
              edges {
                node {
                  id
                }
              }
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
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  return data?.data?.products?.edges?.[0]?.node || null;
}

// REST API para fazer upload de imagem
async function uploadImageREST(productId, imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');
  const extension = path.extname(imagePath).toLowerCase().slice(1);

  const body = {
    image: {
      attachment: base64Image,
      filename: path.basename(imagePath)
    }
  };

  const response = await fetch(
    `https://${SHOPIFY_STORE}/admin/api/2024-10/products/${productId}/images.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN
      },
      body: JSON.stringify(body)
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP ${response.status}: ${error}`);
  }

  return await response.json();
}

// ============================================
// MAIN
// ============================================

async function main() {
  console.log('🚀 Iniciando upload de imagens...\n');
  console.log('='.repeat(70));
  console.log('📸 UPLOAD DE IMAGENS - REST API');
  console.log('='.repeat(70) + '\n');

  const leaguesPath = path.join(__dirname, '../../Leagues');
  let stats = {
    total: 0,
    uploaded: 0,
    skipped: 0,
    errors: 0,
    totalImages: 0
  };

  for (const [categoryFolder, categoryTag] of Object.entries(CATEGORIES)) {
    const categoryPath = path.join(leaguesPath, categoryFolder);

    if (!fs.existsSync(categoryPath)) {
      console.log(`⚠️  Pasta não encontrada: ${categoryFolder}\n`);
      continue;
    }

    const products = fs.readdirSync(categoryPath);
    console.log(`\n📦 ${categoryFolder}: ${products.length} produtos\n`);

    for (const productName of products) {
      const productPath = path.join(categoryPath, productName);

      if (!fs.statSync(productPath).isDirectory()) continue;

      stats.total++;
      const handle = generateHandle(productName, categoryTag);

      try {
        console.log(`   📄 ${productName}`);

        // Busca produto
        const product = await getProductByHandle(handle);

        if (!product) {
          console.log(`      ⚠️  Não encontrado no Shopify\n`);
          stats.skipped++;
          continue;
        }

        // Verifica se já tem imagens
        if (product.images?.edges?.length > 0) {
          console.log(`      ⏭️  Já tem imagens\n`);
          stats.skipped++;
          continue;
        }

        // Lista imagens
        const imageFiles = fs.readdirSync(productPath)
          .filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i))
          .sort();

        if (imageFiles.length === 0) {
          console.log(`      ⚠️  Sem imagens na pasta\n`);
          continue;
        }

        console.log(`      📸 ${imageFiles.length} imagens encontradas`);

        // Upload de cada imagem
        for (const imageFile of imageFiles) {
          const imagePath = path.join(productPath, imageFile);

          try {
            await uploadImageREST(product.legacyResourceId, imagePath);
            console.log(`         ✓ ${imageFile}`);
            stats.totalImages++;

            // Delay para rate limit (2 requests/segundo)
            await new Promise(r => setTimeout(r, 500));

          } catch (err) {
            console.log(`         ✗ ${imageFile}: ${err.message}`);
          }
        }

        stats.uploaded++;
        console.log(`      ✅ Concluído!\n`);

      } catch (err) {
        console.log(`      ❌ Erro: ${err.message}\n`);
        stats.errors++;
      }
    }
  }

  // Relatório
  console.log('\n' + '='.repeat(70));
  console.log('✅ CONCLUÍDO!');
  console.log('='.repeat(70));
  console.log(`📊 Produtos processados: ${stats.total}`);
  console.log(`✅ Com imagens adicionadas: ${stats.uploaded}`);
  console.log(`📸 Total de imagens enviadas: ${stats.totalImages}`);
  console.log(`⏭️  Pulados (já tinham imagens): ${stats.skipped}`);
  console.log(`❌ Erros: ${stats.errors}`);
  console.log('='.repeat(70) + '\n');
}

// Validação
if (!SHOPIFY_ACCESS_TOKEN || SHOPIFY_ACCESS_TOKEN === 'SUA_API_KEY_AQUI') {
  console.error('❌ Configure o SHOPIFY_ACCESS_TOKEN primeiro!\n');
  console.error('1. Acesse: https://djjrjm-0p.myshopify.com/admin/settings/apps/development');
  console.error('2. Use o Custom App existente (ou crie um novo)');
  console.error('3. Permissões: write_products, read_products');
  console.error('4. Copie o Admin API access token');
  console.error('5. Cole na linha 19 deste script\n');
  process.exit(1);
}

main().catch(console.error);
