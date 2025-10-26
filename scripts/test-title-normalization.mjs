/**
 * Script para TESTAR a normalização de títulos
 * Execute antes de rodar o update-all-product-titles.mjs
 */

function normalizeProductTitle(title) {
  const parts = {
    model: '',
    year: '',
    types: [],
    extras: []
  };

  const types = ['Goalkeeper', 'Pre-Match', 'Training', 'Home', 'Away', 'Third'];
  const extras = ['Long Sleeve', 'Suit', 'Jacket', 'Sweatshirt'];

  let workingTitle = title;

  // Detecta ano (4 dígitos ou formato XX/XX, XX_XX, XX-XX)
  const yearMatch = workingTitle.match(/\b(19\d{2}|20\d{2})\b/) || workingTitle.match(/\b(\d{2})[_\-\/](\d{2})\b/);
  if (yearMatch) {
    if (yearMatch[2]) {
      parts.year = `${yearMatch[1]}/${yearMatch[2]}`;
    } else {
      parts.year = yearMatch[1];
    }
    workingTitle = workingTitle.replace(yearMatch[0], '').trim();
  }

  for (const type of types) {
    const regex = new RegExp(`\\b${type}\\b`, 'i');
    if (regex.test(workingTitle)) {
      parts.types.push(type);
      workingTitle = workingTitle.replace(regex, '').trim();
    }
  }

  for (const extra of extras) {
    const regex = new RegExp(`\\b${extra}\\b`, 'i');
    if (regex.test(workingTitle)) {
      parts.extras.push(extra);
      workingTitle = workingTitle.replace(regex, '').trim();
    }
  }

  parts.model = workingTitle.trim();

  const rebuiltTitle = [
    parts.model,
    parts.year,
    ...parts.types,
    ...parts.extras
  ].filter(Boolean).join(' ');

  return rebuiltTitle || title;
}

// Exemplos de teste
const testCases = [
  '1988 Brazil Home',
  'Brazil 24-25 Home',
  'Brazil 24_25 Home',
  'Flamengo 00_01 Away',
  'Corinthians 23-24 Home',
  '2024 Argentina Home',
  'Germany 1994 Away Long Sleeve',
  'Brazil 2002 Home Goalkeeper',
  'Palmeiras 24/25 Training',
  'Santos 11_12 Home',
  'Flamengo 08-09 Away',
  'Brazil 1998 Home Long Sleeve'
];

console.log('🧪 TESTE DE NORMALIZAÇÃO DE TÍTULOS\n');
console.log('='.repeat(80));
console.log('PADRÃO: [MODELO] [ANO] [TIPO] [EXTRAS]');
console.log('TEMPORADAS: Sempre com barra (/) → 24/25, 00/01, etc');
console.log('='.repeat(80) + '\n');

testCases.forEach(title => {
  const normalized = normalizeProductTitle(title);
  const changed = title !== normalized ? '✅ MUDOU' : '⏭️  IGUAL';

  console.log(`${changed}`);
  console.log(`  ANTES: "${title}"`);
  console.log(`  DEPOIS: "${normalized}"\n`);
});

console.log('='.repeat(80));
console.log('✅ Teste concluído! Se estiver correto, execute update-all-product-titles.mjs');
console.log('='.repeat(80));
