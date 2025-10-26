import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script para atualizar títulos de TODOS os produtos na Shopify
 *
 * Padroniza para: [MODELO] [ANO] [TIPO] [EXTRAS]
 * Converte temporadas: 24-25 ou 24_25 → 24/25
 *
 * Como usar:
 * 1. Configure SHOPIFY_ACCESS_TOKEN
 * 2. Execute: node scripts/update-all-product-titles.mjs
 */

// ============================================
// CONFIGURAÇÃO DA SHOPIFY API
// ============================================
const SHOPIFY_STORE = 'djjrjm-0p.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = 'SUA_API_KEY_AQUI'; // Adicionar Admin API access token

// ============================================
// FUNÇÃO DE NORMALIZAÇÃO DE TÍTULO
// ============================================

function normalizeProductTitle(title) {
  // Já vem sem (Size ...) da Shopify

  // Extrai componentes do título
  const parts = {
    model: '',
    year: '',
    types: [], // Mudado para array para suportar múltiplos tipos
    extras: []
  };

  // Lista de tipos conhecidos (ordenado por especificidade)
  const types = ['Goalkeeper', 'Pre-Match', 'Training', 'Home', 'Away', 'Third'];
  const extras = ['Long Sleeve', 'Suit', 'Jacket', 'Sweatshirt'];

  let workingTitle = title;

  // Detecta ano (4 dígitos ou formato XX/XX, XX_XX, XX-XX)
  const yearMatch = workingTitle.match(/\b(19\d{2}|20\d{2})\b/) || workingTitle.match(/\b(\d{2})[_\-\/](\d{2})\b/);
  if (yearMatch) {
    // Se for temporada (XX/XX), padroniza com barra
    if (yearMatch[2]) {
      parts.year = `${yearMatch[1]}/${yearMatch[2]}`;
    } else {
      parts.year = yearMatch[1];
    }
    workingTitle = workingTitle.replace(yearMatch[0], '').trim();
  }

  // Detecta TODOS os tipos (não apenas o primeiro)
  for (const type of types) {
    const regex = new RegExp(`\\b${type}\\b`, 'i');
    if (regex.test(workingTitle)) {
      parts.types.push(type);
      workingTitle = workingTitle.replace(regex, '').trim();
    }
  }

  // Detecta extras
  for (const extra of extras) {
    const regex = new RegExp(`\\b${extra}\\b`, 'i');
    if (regex.test(workingTitle)) {
      parts.extras.push(extra);
      workingTitle = workingTitle.replace(regex, '').trim();
    }
  }

  // O que sobrou é o modelo
  parts.model = workingTitle.trim();

  // Reconstrói o título na ordem: [MODELO] [ANO] [TIPOS] [EXTRAS]
  const rebuiltTitle = [
    parts.model,
    parts.year,
    ...parts.types,
    ...parts.extras
  ].filter(Boolean).join(' ');

  return rebuiltTitle || title;
}

// ============================================
// FUNÇÕES DA API SHOPIFY
// ============================================

async function getAllProducts() {
  let allProducts = [];
  let hasNextPage = true;
  let cursor = null;

  console.log('📥 Buscando todos os produtos da Shopify...\n');

  while (hasNextPage) {
    const query = `
      query GetProducts($cursor: String) {
        products(first: 50, after: $cursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              handle
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
        variables: { cursor }
      })
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
    }

    const products = data.data.products.edges.map(edge => edge.node);
    allProducts = allProducts.concat(products);

    hasNextPage = data.data.products.pageInfo.hasNextPage;
    cursor = data.data.products.pageInfo.endCursor;

    console.log(`   ✓ Carregados ${allProducts.length} produtos...`);
  }

  console.log(`\n✅ Total de produtos encontrados: ${allProducts.length}\n`);
  return allProducts;
}

async function updateProductTitle(productId, newTitle) {
  const mutation = `
    mutation UpdateProductTitle($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          title
        }
        userErrors {
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
        input: {
          id: productId,
          title: newTitle
        }
      }
    })
  });

  const data = await response.json();

  if (data?.data?.productUpdate?.userErrors?.length > 0) {
    throw new Error(data.data.productUpdate.userErrors[0].message);
  }

  return data?.data?.productUpdate?.product || null;
}

// ============================================
// FUNÇÃO PRINCIPAL
// ============================================

async function updateAllTitles() {
  console.log('🚀 Iniciando atualização de títulos...\n');
  console.log('='.repeat(60));
  console.log('PADRONIZAÇÃO: [MODELO] [ANO] [TIPO] [EXTRAS]');
  console.log('TEMPORADAS: 24-25 ou 24_25 → 24/25');
  console.log('='.repeat(60) + '\n');

  try {
    // Busca todos os produtos
    const products = await getAllProducts();

    let updated = 0;
    let skipped = 0;
    let errors = 0;

    console.log('🔄 Processando títulos...\n');

    for (const product of products) {
      const oldTitle = product.title;
      const newTitle = normalizeProductTitle(oldTitle);

      // Se o título mudou, atualiza
      if (oldTitle !== newTitle) {
        try {
          console.log(`   📝 "${oldTitle}"`);
          console.log(`      → "${newTitle}"`);

          await updateProductTitle(product.id, newTitle);
          updated++;
          console.log(`      ✅ Atualizado!\n`);

          // Delay para respeitar rate limit (2 requests/segundo)
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (err) {
          console.log(`      ❌ Erro: ${err.message}\n`);
          errors++;
        }
      } else {
        skipped++;
      }
    }

    // Relatório final
    console.log('\n' + '='.repeat(60));
    console.log('✅ PROCESSO CONCLUÍDO!');
    console.log('='.repeat(60));
    console.log(`📊 Total de produtos: ${products.length}`);
    console.log(`✅ Atualizados: ${updated}`);
    console.log(`⏭️  Ignorados (já corretos): ${skipped}`);
    console.log(`❌ Erros: ${errors}`);
    console.log('='.repeat(60) + '\n');

  } catch (err) {
    console.error('❌ Erro fatal:', err);
    process.exit(1);
  }
}

// ============================================
// VALIDAÇÃO E EXECUÇÃO
// ============================================

if (!SHOPIFY_ACCESS_TOKEN || SHOPIFY_ACCESS_TOKEN === 'SUA_API_KEY_AQUI') {
  console.error('❌ ERRO: Configure o SHOPIFY_ACCESS_TOKEN antes de executar!\n');
  console.error('Para obter um access token:');
  console.error('1. Acesse: https://djjrjm-0p.myshopify.com/admin/settings/apps/development');
  console.error('2. Crie um Custom App (ou use o existente)');
  console.error('3. Habilite as permissões: write_products, read_products');
  console.error('4. Copie o Admin API access token');
  console.error('5. Cole na variável SHOPIFY_ACCESS_TOKEN deste script\n');
  process.exit(1);
}

// Executa
updateAllTitles().catch(err => {
  console.error('❌ Erro fatal:', err);
  process.exit(1);
});
