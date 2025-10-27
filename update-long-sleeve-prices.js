require('dotenv').config({ path: '.env.local' });
const https = require('https');

// Configurações
const SHOPIFY_STORE = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const NEW_PRICE = '39900.00'; // Novo preço para Long Sleeve em peso argentino

// Função para fazer requisições à API do Shopify
function shopifyRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: SHOPIFY_STORE,
      path: `/admin/api/2024-01/${path}`,
      method: method,
      headers: {
        'X-Shopify-Access-Token': ACCESS_TOKEN,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // Pegar o header Link para paginação
          const linkHeader = res.headers.link;
          const result = {
            data: JSON.parse(body),
            linkHeader: linkHeader
          };
          resolve(result);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// Função para extrair URL do próximo page do header Link
function getNextPageUrl(linkHeader) {
  if (!linkHeader) return null;

  const links = linkHeader.split(',');
  for (const link of links) {
    if (link.includes('rel="next"')) {
      const match = link.match(/<([^>]+)>/);
      if (match) {
        // Extrair apenas o path da URL
        const url = match[1];
        const pathMatch = url.match(/\/admin\/api\/[^\/]+\/(.+)/);
        return pathMatch ? pathMatch[1] : null;
      }
    }
  }
  return null;
}

// Função para verificar se é Long Sleeve
function isLongSleeve(product) {
  const title = product.title.toLowerCase();
  const productType = (product.product_type || '').toLowerCase();
  const tags = product.tags.toLowerCase();

  // Verifica título, tipo ou tags
  return title.includes('long sleeve') ||
         title.includes('manga longa') ||
         productType.includes('long sleeve') ||
         tags.includes('long sleeve') ||
         tags.includes('manga longa');
}

// Função para atualizar preço de uma variant
async function updateVariantPrice(variantId, price) {
  const data = {
    variant: {
      id: variantId,
      price: price
    }
  };

  return shopifyRequest(`variants/${variantId}.json`, 'PUT', data);
}

// Função principal
async function updateLongSleevePrices() {
  console.log('============================================================');
  console.log('   SHOPIFY LONG SLEEVE PRICE UPDATER');
  console.log('============================================================\n');
  console.log('🚀 Iniciando atualização de preços Long Sleeve...\n');
  console.log(`📍 Loja: ${SHOPIFY_STORE}`);
  console.log(`💰 Novo preço: $${NEW_PRICE} ARS\n`);

  let allProducts = [];
  let nextPageUrl = 'products.json?limit=250';

  // Buscar todos os produtos (cursor-based pagination)
  console.log('📦 Buscando produtos...');
  let pageCount = 1;

  while (nextPageUrl) {
    try {
      const response = await shopifyRequest(nextPageUrl);
      const products = response.data.products;

      if (products && products.length > 0) {
        allProducts = allProducts.concat(products);
        console.log(`   Página ${pageCount}: ${products.length} produtos encontrados`);

        // Pegar próxima página
        nextPageUrl = getNextPageUrl(response.linkHeader);
        pageCount++;

        // Delay para não sobrecarregar a API
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        nextPageUrl = null;
      }
    } catch (error) {
      console.error(`❌ Erro ao buscar produtos: ${error.message}`);
      nextPageUrl = null;
    }
  }

  console.log(`\n✅ Total de produtos encontrados: ${allProducts.length}\n`);

  if (allProducts.length === 0) {
    console.log('⚠️  Nenhum produto encontrado. Verifique as credenciais da API.\n');
    return;
  }

  // Filtrar APENAS produtos Long Sleeve
  console.log('🔍 Filtrando produtos Long Sleeve...');
  const longSleeveProducts = [];
  const regularProducts = [];

  for (const product of allProducts) {
    // Verificar se é long sleeve
    const isLS = isLongSleeve(product);

    if (isLS) {
      longSleeveProducts.push(product);
      console.log(`   ✅ "${product.title}"`);
    } else {
      regularProducts.push(product);
    }
  }

  console.log(`\n📊 Resumo:`);
  console.log(`   ✅ Produtos Long Sleeve encontrados: ${longSleeveProducts.length}`);
  console.log(`   ⏭️  Produtos regulares (ignorados): ${regularProducts.length}\n`);

  if (longSleeveProducts.length === 0) {
    console.log('⚠️  Nenhum produto Long Sleeve encontrado.\n');
    return;
  }

  // Confirmar antes de atualizar
  console.log('⚠️  ATENÇÃO: Você está prestes a atualizar os preços de ' + longSleeveProducts.length + ' produtos Long Sleeve!\n');
  console.log('   Pressione Ctrl+C para cancelar ou aguarde 5 segundos para continuar...\n');

  let countdown = 5;
  for (let i = 0; i < 5; i++) {
    process.stdout.write(`\r   Iniciando em ${countdown}...`);
    countdown--;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  console.log('\n');

  // Atualizar preços
  console.log('💰 Atualizando preços...\n');
  let updated = 0;
  let errors = 0;

  for (const product of longSleeveProducts) {
    console.log(`📝 Produto: "${product.title}"`);

    for (const variant of product.variants) {
      try {
        const oldPrice = variant.price;
        await updateVariantPrice(variant.id, NEW_PRICE);
        console.log(`   ✅ Variante "${variant.title}": $${oldPrice} → $${NEW_PRICE} ARS`);
        updated++;

        // Delay para não sobrecarregar a API (rate limit: 2 requests/second)
        await new Promise(resolve => setTimeout(resolve, 600));
      } catch (error) {
        console.log(`   ❌ Erro na variante "${variant.title}": ${error.message}`);
        errors++;
      }
    }
    console.log('');
  }

  // Resumo final
  console.log('============================================================');
  console.log('   ATUALIZAÇÃO CONCLUÍDA');
  console.log('============================================================\n');
  console.log(`✅ Variantes atualizadas com sucesso: ${updated}`);
  console.log(`❌ Erros: ${errors}`);
  console.log(`📦 Total de produtos Long Sleeve: ${longSleeveProducts.length}\n`);
}

// Executar
updateLongSleevePrices().catch(error => {
  console.error('\n❌ Erro fatal:', error.message);
  process.exit(1);
});
