#!/usr/bin/env node

/**
 * Script para criar coleções no Shopify
 * Cria coleções para todas as ligas + Más Vendidos
 */

const collections = [
  {
    title: "Más Vendidos",
    handle: "mas-vendidos",
    description: "Los productos más vendidos de Foltz Fanwear",
    sort_order: "best-selling"
  },
  {
    title: "Premier League",
    handle: "premier-league",
    description: "Liga inglesa - la más competitiva del mundo"
  },
  {
    title: "La Liga",
    handle: "la-liga",
    description: "Liga española - Real Madrid, Barcelona y más"
  },
  {
    title: "Serie A",
    handle: "serie-a",
    description: "Liga italiana - Juventus, Milan, Inter y más"
  },
  {
    title: "Bundesliga",
    handle: "bundesliga",
    description: "Liga alemana de fútbol - los mejores equipos de Alemania"
  },
  {
    title: "Ligue 1",
    handle: "ligue-1",
    description: "Liga francesa - PSG, Lyon, Marseille y más"
  },
  {
    title: "Sul-Americana",
    handle: "sul-americana",
    description: "Ligas sudamericanas - Brasil, Argentina y más"
  },
  {
    title: "Liga Portugal",
    handle: "liga-portugal",
    description: "Campeonato portugués - Benfica, Porto, Sporting"
  },
  {
    title: "Brasileirão",
    handle: "brasileirao",
    description: "Campeonato Brasileño Serie A - los mejores equipos de Brasil"
  },
  {
    title: "Eredivisie",
    handle: "eredivisie",
    description: "Campeonato holandés de fútbol profesional"
  },
  {
    title: "Liga MX",
    handle: "liga-mx",
    description: "Campeonato mexicano de fútbol"
  },
  {
    title: "MLS",
    handle: "mls",
    description: "Major League Soccer - fútbol americano"
  },
  {
    title: "National Teams",
    handle: "national-teams",
    description: "Selecciones nacionales de todo el mundo"
  },
  {
    title: "Manga Longa",
    handle: "manga-longa",
    description: "Camisetas de manga larga de todas las ligas"
  }
];

console.log('📦 Collections to create:');
collections.forEach((col, i) => {
  console.log(`${i + 1}. ${col.title} (${col.handle})`);
});

console.log('\n✅ Total:', collections.length, 'collections');
console.log('\nTo create these collections, run the GraphQL mutations manually or use Shopify Admin.');
