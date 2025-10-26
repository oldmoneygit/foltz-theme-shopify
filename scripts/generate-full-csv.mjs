import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeamento de categorias para tags e configurações
const CATEGORIES = {
  'Albums belong to Brazil team column': {
    tag: 'brazil',
    liga: 'liga:national-teams',
    vendor: 'Foltz Fanwear',
    type: 'Camiseta'
  },
  'Albums belong to Corinthians': {
    tag: 'corinthians',
    liga: 'liga:brasileirao',
    vendor: 'Foltz Fanwear',
    type: 'Camiseta'
  },
  'Albums belong to Flamengo': {
    tag: 'flamengo',
    liga: 'liga:brasileirao',
    vendor: 'Foltz Fanwear',
    type: 'Camiseta'
  },
  'Albums belong to National Teams': {
    tag: 'national-teams',
    liga: 'liga:national-teams',
    vendor: 'Foltz Fanwear',
    type: 'Camiseta'
  },
  'Albums belong to Palmeiras': {
    tag: 'palmeiras',
    liga: 'liga:brasileirao',
    vendor: 'Foltz Fanwear',
    type: 'Camiseta'
  },
  'Albums belong to Santos': {
    tag: 'santos',
    liga: 'liga:brasileirao',
    vendor: 'Foltz Fanwear',
    type: 'Camiseta'
  }
};

// Função para gerar handle do produto
function generateHandle(productName, categoryTag) {
  // Remove caracteres especiais e substitui espaços por hífens
  let handle = productName
    .toLowerCase()
    .replace(/\(size [s-x]+\)/gi, '') // Remove (Size S-XXL)
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .replace(/^-|-$/g, ''); // Remove hífens no início/fim

  // Adiciona prefixo da categoria para evitar duplicatas
  return `${categoryTag}-${handle}`;
}

// Função para detectar tamanhos no nome do produto
function detectSizes(productName) {
  // Padrões: (Size S-XXL), (Size S-XXXL), etc
  const sizePattern = /\(Size ([S-X]+)\)/i;
  const match = productName.match(sizePattern);

  if (match) {
    const sizeRange = match[1];

    // Mapeia os tamanhos possíveis
    const sizeOrder = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

    // Detecta o intervalo (ex: S-XXL)
    if (sizeRange.includes('-')) {
      const [start, end] = sizeRange.split('-');
      const startIndex = sizeOrder.indexOf(start);
      const endIndex = sizeOrder.indexOf(end);

      if (startIndex !== -1 && endIndex !== -1) {
        return sizeOrder.slice(startIndex, endIndex + 1);
      }
    }
  }

  // Default: todos os tamanhos principais
  return ['S', 'M', 'L', 'XL', 'XXL'];
}

// Função para detectar tipo (Home, Away, etc)
function detectType(productName) {
  const lower = productName.toLowerCase();

  if (lower.includes('home')) return 'tipo:home';
  if (lower.includes('away')) return 'tipo:away';
  if (lower.includes('third')) return 'tipo:third';
  if (lower.includes('goalkeeper')) return 'tipo:goalkeeper';
  if (lower.includes('training')) return 'tipo:training';
  if (lower.includes('pre-match')) return 'tipo:pre-match';

  return 'tipo:home'; // Default
}

// Função para detectar se é manga longa
function detectLongSleeve(productName) {
  return productName.toLowerCase().includes('long sleeve') ? 'tipo:manga-longa' : null;
}

// Função para detectar temporada
function detectSeason(productName) {
  // Detecta anos como 2002, 1998, etc
  const yearMatch = productName.match(/\b(19\d{2}|20\d{2})\b/);
  if (yearMatch) {
    const year = parseInt(yearMatch[1]);
    if (year < 2015) return 'temporada:retro';
    if (year >= 2024) return 'temporada:24-25';
    if (year >= 2023) return 'temporada:23-24';
  }

  // Detecta padrões como 24/25, 08/09
  const seasonMatch = productName.match(/(\d{2})[-_/](\d{2})/);
  if (seasonMatch) {
    return `temporada:${seasonMatch[1]}-${seasonMatch[2]}`;
  }

  return null;
}

// Função para gerar preço baseado no tipo de produto
function generatePrice(productName) {
  const lower = productName.toLowerCase();

  // Produtos especiais/vintage são mais caros
  if (lower.includes('retro') || lower.match(/19\d{2}/)) {
    return Math.floor(Math.random() * 20000) + 95000; // 95.000 - 115.000
  }

  // Produtos de treino/agasalho são mais baratos
  if (lower.includes('training') || lower.includes('suit') || lower.includes('jacket')) {
    return Math.floor(Math.random() * 15000) + 65000; // 65.000 - 80.000
  }

  // Manga longa um pouco mais caro
  if (lower.includes('long sleeve')) {
    return Math.floor(Math.random() * 15000) + 82000; // 82.000 - 97.000
  }

  // Preço padrão
  return Math.floor(Math.random() * 20000) + 75000; // 75.000 - 95.000
}

// Função para formatar preço para Shopify (formato: 12345.00)
function formatPrice(price) {
  return price.toFixed(2);
}

// Função para escapar valores do CSV (adiciona aspas se necessário)
function escapeCSV(value) {
  if (!value) return '';

  // Se contém vírgula, aspas duplas ou quebra de linha, precisa escapar
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    // Duplica aspas duplas internas e envolve com aspas
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

// Função principal
async function generateCSV() {
  const leaguesPath = path.join(__dirname, '../../Leagues');
  const outputPath = path.join(__dirname, '../products-import.csv');

  console.log('🚀 Iniciando geração do CSV...\n');

  const rows = [];
  let totalProducts = 0;
  let totalVariants = 0;

  // Cabeçalho do CSV
  const header = 'Handle,Title,Body (HTML),Vendor,Type,Tags,Published,Option1 Name,Option1 Value,Variant SKU,Variant Inventory Qty,Variant Price,Variant Compare At Price,Image Src,Status';
  rows.push(header);

  // Processa cada categoria
  for (const [categoryFolder, config] of Object.entries(CATEGORIES)) {
    const categoryPath = path.join(leaguesPath, categoryFolder);

    if (!fs.existsSync(categoryPath)) {
      console.log(`⚠️  Pasta não encontrada: ${categoryFolder}`);
      continue;
    }

    // Lista todos os produtos da categoria
    const products = fs.readdirSync(categoryPath);
    console.log(`📦 Processando ${categoryFolder}: ${products.length} produtos`);

    products.forEach(productName => {
      const productPath = path.join(categoryPath, productName);
      const stats = fs.statSync(productPath);

      // Apenas pastas (cada pasta é um produto)
      if (!stats.isDirectory()) return;

      totalProducts++;

      // Gera informações do produto
      const handle = generateHandle(productName, config.tag);
      const title = productName.replace(/\s*\(Size [^\)]+\)/gi, '').trim(); // Remove (Size ...) do título
      const sizes = detectSizes(productName);
      const typeTag = detectType(productName);
      const longSleeveTag = detectLongSleeve(productName);
      const seasonTag = detectSeason(productName);
      const basePrice = generatePrice(productName);
      const comparePrice = Math.floor(basePrice * 1.4); // 40% de desconto

      // Monta tags
      const tags = [
        config.tag,
        config.liga,
        typeTag,
        longSleeveTag,
        seasonTag
      ].filter(Boolean).join(',');

      // Descrição
      const body = `<p>Camiseta ${title} - ${config.vendor}</p>`;

      // Imagem será adicionada depois via script de upload
      const imageSrc = '';

      // Cria variantes para cada tamanho
      sizes.forEach((size, index) => {
        totalVariants++;

        const sku = `${config.tag.toUpperCase()}-${handle.substring(0, 20)}-${size}`.replace(/[^A-Z0-9-]/g, '');
        const inventory = Math.floor(Math.random() * 20) + 10; // 10-30 unidades

        // Primeira linha tem todas as informações, demais apenas variantes
        if (index === 0) {
          rows.push([
            handle,
            escapeCSV(title),
            escapeCSV(body),
            config.vendor,
            config.type,
            escapeCSV(tags), // Tags contém vírgulas, precisa escapar!
            'TRUE',
            'Size',
            size,
            sku,
            inventory,
            formatPrice(basePrice),
            formatPrice(comparePrice),
            imageSrc,
            'active'
          ].join(','));
        } else {
          rows.push([
            handle,
            '', // Title vazio
            '', // Body vazio
            '', // Vendor vazio
            '', // Type vazio
            '', // Tags vazio
            '', // Published vazio
            'Size',
            size,
            sku,
            inventory,
            formatPrice(basePrice),
            formatPrice(comparePrice),
            '', // Image vazia
            'active'
          ].join(','));
        }
      });
    });
  }

  // Escreve o arquivo CSV
  fs.writeFileSync(outputPath, rows.join('\n'), 'utf-8');

  console.log('\n✅ CSV gerado com sucesso!');
  console.log(`📊 Produtos: ${totalProducts}`);
  console.log(`📊 Variantes: ${totalVariants}`);
  console.log(`📄 Arquivo: ${outputPath}`);
}

// Executa
generateCSV().catch(console.error);
