#!/usr/bin/env node

/**
 * Script para criar coleções no Shopify via GraphQL Admin API
 */

import { execSync } from 'child_process';

const collections = [
  {
    title: "Más Vendidos",
    handle: "mas-vendidos",
    description: "Los productos más vendidos de Foltz Fanwear",
    sortOrder: "BEST_SELLING"
  },
  {
    title: "Premier League",
    handle: "premier-league",
    description: "Liga inglesa - la más competitiva del mundo",
    sortOrder: "ALPHA_ASC"
  },
  {
    title: "La Liga",
    handle: "la-liga",
    description: "Liga española - Real Madrid, Barcelona y más",
    sortOrder: "ALPHA_ASC"
  },
  {
    title: "Serie A",
    handle: "serie-a",
    description: "Liga italiana - Juventus, Milan, Inter y más",
    sortOrder: "ALPHA_ASC"
  },
  {
    title: "Bundesliga",
    handle: "bundesliga",
    description: "Liga alemana de fútbol - los mejores equipos de Alemania",
    sortOrder: "ALPHA_ASC"
  },
  {
    title: "Ligue 1",
    handle: "ligue-1",
    description: "Liga francesa - PSG, Lyon, Marseille y más",
    sortOrder: "ALPHA_ASC"
  },
  {
    title: "Sul-Americana",
    handle: "sul-americana",
    description: "Ligas sudamericanas - Brasil, Argentina y más",
    sortOrder: "ALPHA_ASC"
  },
  {
    title: "Liga Portugal",
    handle: "liga-portugal",
    description: "Campeonato portugués - Benfica, Porto, Sporting",
    sortOrder: "ALPHA_ASC"
  },
  {
    title: "Brasileirão",
    handle: "brasileirao",
    description: "Campeonato Brasileño Serie A - los mejores equipos de Brasil",
    sortOrder: "ALPHA_ASC"
  },
  {
    title: "Eredivisie",
    handle: "eredivisie",
    description: "Campeonato holandés de fútbol profesional",
    sortOrder: "ALPHA_ASC"
  },
  {
    title: "Liga MX",
    handle: "liga-mx",
    description: "Campeonato mexicano de fútbol",
    sortOrder: "ALPHA_ASC"
  },
  {
    title: "MLS",
    handle: "mls",
    description: "Major League Soccer - fútbol americano",
    sortOrder: "ALPHA_ASC"
  },
  {
    title: "National Teams",
    handle: "national-teams",
    description: "Selecciones nacionales de todo el mundo",
    sortOrder: "ALPHA_ASC"
  },
  {
    title: "Manga Longa",
    handle: "manga-longa",
    description: "Camisetas de manga larga de todas las ligas",
    sortOrder: "ALPHA_ASC"
  }
];

console.log('🚀 Creating collections via Shopify GraphQL API...\n');

let successCount = 0;
let errorCount = 0;

for (const collection of collections) {
  const mutation = `
    mutation {
      collectionCreate(input: {
        title: "${collection.title}"
        handle: "${collection.handle}"
        descriptionHtml: "<p>${collection.description}</p>"
        sortOrder: ${collection.sortOrder}
        published: true
      }) {
        collection {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `.replace(/\n/g, ' ').replace(/\s+/g, ' ');

  try {
    console.log(`Creating: ${collection.title}...`);

    const result = execSync(
      `shopify admin graphql --query="${mutation}"`,
      {
        encoding: 'utf-8',
        stdio: 'pipe'
      }
    );

    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0]);

      if (data.data?.collectionCreate?.collection) {
        console.log(`✅ Created: ${collection.title} (${collection.handle})\n`);
        successCount++;
      } else if (data.data?.collectionCreate?.userErrors?.length > 0) {
        const errors = data.data.collectionCreate.userErrors;
        console.error(`❌ Error creating ${collection.title}:`);
        errors.forEach(err => console.error(`   - ${err.message}`));
        console.log('');
        errorCount++;
      }
    }

    // Wait 500ms between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));

  } catch (error) {
    console.error(`❌ Error creating ${collection.title}:`, error.message);
    console.log('');
    errorCount++;
  }
}

console.log('\n📊 Summary:');
console.log(`✅ Success: ${successCount}`);
console.log(`❌ Errors: ${errorCount}`);
console.log(`📦 Total: ${collections.length}`);
