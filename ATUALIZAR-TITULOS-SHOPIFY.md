# 📝 Guia: Atualizar Títulos de TODOS os Produtos na Shopify

Este guia explica como padronizar automaticamente os títulos de todos os produtos já importados na Shopify.

---

## 🎯 O Que Este Script Faz?

Atualiza automaticamente os títulos de **TODOS os produtos** na loja para o padrão:

**[MODELO] [ANO] [TIPO] [EXTRAS]**

### Transformações Aplicadas

| ANTES | DEPOIS |
|-------|--------|
| 1988 Brazil Home | **Brazil 1988 Home** |
| Brazil 24-25 Home | **Brazil 24/25 Home** ✅ Barra |
| Brazil 24_25 Home | **Brazil 24/25 Home** ✅ Barra |
| Flamengo 00_01 Away | **Flamengo 00/01 Away** ✅ Barra |
| Corinthians 23-24 Home | **Corinthians 23/24 Home** ✅ Barra |
| 2024 Argentina Home | **Argentina 2024 Home** |
| Brazil 2002 Home Goalkeeper | **Brazil 2002 Goalkeeper Home** |
| Santos 11_12 Home | **Santos 11/12 Home** ✅ Barra |

### Padronizações

- ✅ **Ordem:** Modelo primeiro, depois ano, tipo e extras
- ✅ **Temporadas:** Sempre com **barra (/)** → 24/25, 00/01, 11/12
- ✅ **Múltiplos tipos:** Detecta todos (Home + Goalkeeper)
- ✅ **Automático:** Atualiza TODOS os produtos de uma vez

---

## 📋 Pré-requisitos

### 1. Custom App na Shopify

Você precisa de um **Admin API access token**:

1. Acesse: https://djjrjm-0p.myshopify.com/admin/settings/apps/development
2. Se ainda não existe, clique em **Create an app**
   - Nome: `Foltz Product Updater`
3. Em **Configuration** → **Admin API integration**:
   - ✅ Habilite: `write_products`
   - ✅ Habilite: `read_products`
4. Clique em **Save**
5. Em **API credentials** → **Install app**
6. **Copie o Admin API access token** (você só verá uma vez!)

---

## 🧪 PASSO 1: Testar (Recomendado)

Antes de atualizar todos os produtos, teste a normalização:

```bash
cd shopify-theme-foltz
node scripts/test-title-normalization.mjs
```

Você verá:
```
🧪 TESTE DE NORMALIZAÇÃO DE TÍTULOS
================================================================================
PADRÃO: [MODELO] [ANO] [TIPO] [EXTRAS]
TEMPORADAS: Sempre com barra (/) → 24/25, 00/01, etc
================================================================================

✅ MUDOU
  ANTES: "Brazil 24-25 Home"
  DEPOIS: "Brazil 24/25 Home"

✅ MUDOU
  ANTES: "Flamengo 00_01 Away"
  DEPOIS: "Flamengo 00/01 Away"
...
```

Se tudo estiver correto, prossiga para o Passo 2.

---

## ⚙️ PASSO 2: Configurar Access Token

Edite o arquivo `scripts/update-all-product-titles.mjs`:

```javascript
// Linha 19: Cole seu access token
const SHOPIFY_ACCESS_TOKEN = 'shpat_xxxxxxxxxxxxx'; // ← Cole aqui
```

---

## 🚀 PASSO 3: Executar Atualização

Execute o script para atualizar **TODOS os produtos**:

```bash
cd shopify-theme-foltz
node scripts/update-all-product-titles.mjs
```

### O Que Acontece

O script vai:

1. **Buscar todos os produtos** da Shopify via API
2. **Normalizar cada título** seguindo o padrão
3. **Atualizar automaticamente** se o título mudou
4. **Mostrar progresso** em tempo real:

```
🚀 Iniciando atualização de títulos...

==============================================================
PADRONIZAÇÃO: [MODELO] [ANO] [TIPO] [EXTRAS]
TEMPORADAS: 24-25 ou 24_25 → 24/25
==============================================================

📥 Buscando todos os produtos da Shopify...

   ✓ Carregados 50 produtos...
   ✓ Carregados 100 produtos...
   ✓ Carregados 150 produtos...

✅ Total de produtos encontrados: 233

🔄 Processando títulos...

   📝 "1988 Brazil Home"
      → "Brazil 1988 Home"
      ✅ Atualizado!

   📝 "Brazil 24-25 Home"
      → "Brazil 24/25 Home"
      ✅ Atualizado!

   📝 "Flamengo 00_01 Away"
      → "Flamengo 00/01 Away"
      ✅ Atualizado!

...
```

### Tempo Estimado

- **233 produtos:** ~2-3 minutos
- O script respeita rate limits da API (500ms entre requests)

---

## 📊 PASSO 4: Verificar Resultados

Ao final, você verá o relatório:

```
==============================================================
✅ PROCESSO CONCLUÍDO!
==============================================================
📊 Total de produtos: 233
✅ Atualizados: 187
⏭️  Ignorados (já corretos): 46
❌ Erros: 0
==============================================================
```

Acesse sua loja para conferir:
https://djjrjm-0p.myshopify.com/admin/products

---

## 🔧 Troubleshooting

### Erro: "Invalid access token"

- ✅ Verifique se copiou o token completo
- ✅ Confirme se as permissões `write_products` e `read_products` estão habilitadas
- ✅ Reinstale o Custom App se necessário

### Erro: "Rate limit exceeded"

- O script já tem delays embutidos (500ms)
- Se ainda ocorrer, aumente o delay na linha 188 do script

### Alguns produtos não foram atualizados

- Verifique os logs para identificar erros específicos
- Produtos com títulos muito complexos podem precisar de ajustes manuais

---

## ✅ Checklist Completo

- [ ] Custom App criado e configurado
- [ ] Permissões `write_products` e `read_products` habilitadas
- [ ] Admin API access token obtido
- [ ] Token configurado no script (linha 19)
- [ ] Teste executado e aprovado
- [ ] Script de atualização executado
- [ ] Todos os produtos atualizados com sucesso
- [ ] Loja verificada

---

## 📌 Notas Importantes

- ⚠️ **Backup:** Não é possível desfazer em massa. Se necessário, faça backup dos títulos antes
- ✅ **Seguro:** O script só atualiza títulos, não afeta preços, imagens ou outros dados
- ✅ **Inteligente:** Ignora produtos que já estão no padrão correto
- ✅ **Rate Limit:** Respeita os limites da API Shopify automaticamente

---

## 🎉 Pronto!

Todos os produtos da sua loja agora seguem o padrão:

**[MODELO] [ANO] [TIPO] [EXTRAS]**

Com temporadas sempre em formato **24/25** (barra) ✅
