# Kit de sites

Um projeto só gera os sites de todas as clientes, em vários estilos. Cada cliente é uma **ficha** (arquivo JSON) e cada estilo é uma **combinação de peças** (topo, sobre, serviços, galeria...).

## Rodar

```bash
cd kit
npm install      # só na primeira vez
npm run dev      # abre em http://localhost:4321
```

Para ver no celular (mesmo Wi-Fi): `npm run dev -- --host` e abra no celular o endereço "Network" que aparecer.

Para gerar os arquivos finais: `npm run build` → pasta `dist/` (HTML estático, sobe em qualquer hospedagem).

## Publicação (GitHub Pages)

A cada `git push` na branch `main`, o GitHub gera e publica o site sozinho (arquivo `.github/workflows/publicar.yml`). Ele fica em:

- https://alvaroalano.github.io/Kits/ (índice)
- https://alvaroalano.github.io/Kits/marina-albuquerque/ (propostas de uma cliente)

Na primeira vez é preciso ligar o Pages no repositório: **Settings → Pages → Source: GitHub Actions**.

Atenção: repositório público e GitHub Pages são **abertos para qualquer pessoa**. Serve para as demos fictícias; para fichas de clientes reais, use um repositório privado com outra hospedagem (ex.: Cloudflare Pages).

## Endereços

| Endereço | O que é |
|---|---|
| `/` | Índice interno com todas as fichas |
| `/<cliente>/` | Página que vai para a cliente: todas as propostas de estilo com a marca dela |
| `/<cliente>/<estilo>/` | O site em um estilo |

## Nova cliente (ou nova demo para uma call)

1. Copie `src/clientes/marina-albuquerque.json` com o nome da cliente (ex.: `studio-bella.json`).
2. Troque `slug`, nome, cor, contato, endereço, horários e serviços.
3. Pronto: `/studio-bella/` e `/studio-bella/maison/` já existem.

### Cor
`"cor": "#A27B5C"` — pode ser a cor exata da marca, mesmo que seja forte. O kit usa o **tom** dela e cada estilo decide claridade e intensidade, então magenta vira rosa antigo, azul forte vira azul acinzentado etc. Para forçar uma cor específica: `"cores": { "destaque": "#B08A6E" }`.

### Logo
- Sem logo boa: deixe `"logo": null` e o kit monta a logo escrita com `linha1` e `linha2` (use `*palavra*` para itálico).
- Com logo: coloque o arquivo em `public/clientes/<slug>/logo.svg` e use `"logo": "/clientes/<slug>/logo.svg"`. Se precisar de uma versão clara para o rodapé escuro: `"logoClara": ".../logo-clara.svg"`.

### Fotos
Cada estilo já vem com fotos de banco. Para trocar só algumas, na ficha:

```json
"fotos": {
  "hero": { "src": "/clientes/studio-bella/hero.jpg", "alt": "Descrição da foto", "foco": "50% 30%" },
  "especialista": { "src": "/clientes/studio-bella/dona.jpg", "alt": "Retrato da Bella" }
}
```

`foco` diz qual ponto da foto não pode ser cortado (horizontal vertical), útil para não cortar rosto.

### Textos
Cada estilo tem textos padrão com `{cidade}`, `{bairro}`, `{profissional}`, `{anos}`... preenchidos pela ficha. Para trocar qualquer texto, repita só o trecho na ficha:

```json
"textos": { "hero": { "titulo": "Pele bonita\né pele *cuidada*." } }
```

### Só alguns estilos para essa cliente
`"estilos": ["maison", "botanico", "acolhedor"]` — sem isso, a cliente recebe todos os estilos existentes. Para vender, 2 ou 3 estilos escolhidos pelo perfil costumam funcionar melhor que os 5.

### Estilo recomendado
`"recomendado": "botanico"` — esse estilo vem primeiro na página de propostas, com o selo **Recomendado para você**.

### Navegação entre propostas e "Gostei desta" (só nas demos)
Com `"demo": true`, cada proposta ganha uma barra embaixo com **Todas as propostas**, **anterior/próxima** (as setas ← → do teclado também funcionam, útil numa call) e **Gostei desta**, que abre o WhatsApp com a mensagem "gostei do estilo X".

O número e a mensagem ficam em `src/kit.json` (vale para todas as fichas). Para uma ficha específica mandar para outro número:

```json
"propostas": { "whatsapp": "5548999999999" }
```

No site definitivo (sem `"demo": true`) a barra não aparece.

### Site definitivo
Quando fechar: tire `"demo": true` (libera o Google) e publique só o estilo escolhido no domínio dela. O `public/robots.txt` deste projeto bloqueia o Google porque aqui ficam as demos.

## Estrutura

```
src/
  clientes/            uma ficha por cliente
  estilos/
    base.css           base comum (botões, títulos, animações)
    maison/estilo.json receita do estilo: fontes, paleta, peças, textos e fotos padrão
  pecas/               as peças, cada uma com suas variantes
    index.js           catálogo de peças que os estilos podem usar
  lib/
    cor.js             gera a paleta a partir da cor da cliente
    site.js            junta ficha + estilo
```

## Estilos

| Estilo | Perfil | Formato das fotos | Fonte | Topo | Serviços | Galeria | Extras |
|---|---|---|---|---|---|---|---|
| **Maison** | luxo discreto | reta com moldura deslocada | Bodoni Moda + Manrope | editorial (painel sobre a foto) | cardápio | mosaico | primeira visita em 3 passos |
| **Clínico** | técnico, moderno | círculo com anel fino | Instrument Serif + Inter Tight + IBM Plex Mono | centralizado com 3 fotos redondas | acordeão (abre ao tocar) | carrossel de arrastar | diferenciais, formação, dúvidas frequentes, mapa sob demanda |
| **Botânico** | natural, acolhedor | recorte orgânico (seixo) | Fraunces "macia" + Figtree | foto de ponta a ponta com borda curva | cards por categoria, com capa | mural em colunas | frase-manifesto, selo girando, horários com "aberto agora", nome gigante no rodapé |
| **Acolhedor** | caloroso, delicado | arco (topo em meio círculo) | Young Serif + Nunito Sans + Caveat (letra de mão) | arco no centro, título de um lado e texto do outro, anotação manuscrita | índice com arco fixo que troca de foto por categoria | arcada (fileira de arcos) | carta da especialista, depoimentos, cabeçalho de boutique, bolha de WhatsApp com mensagem |
| **Essencial** | jovem, direto, colorido | sem moldura (reta) e cápsulas dentro do título | Bricolage Grotesque + Hanken Grotesk (só sem serifa) | tipográfico: título gigante com fotos entre as palavras + faixa de tratamentos rolando | abas por categoria | duas faixas de fotos rolando | adesivo "desde", números em blocos, @ do Instagram gigante, "BORA MARCAR?" |

**No celular**

| | Maison | Clínico | Botânico | Essencial | Acolhedor |
|---|---|---|---|---|---|
| Menu | tela cheia | gaveta lateral | folha que sobe de baixo | cortina colorida que desce do topo | círculo que se expande a partir do botão |
| Topo | foto na largura toda, texto sobe por cima | título primeiro, fotos redondas embaixo | foto na tela toda, texto por cima | só texto grande com fotos em cápsula | arco primeiro, título centralizado embaixo |
| Agendar | barra fixa embaixo | botão flutuante (fica claro sobre seções escuras) | barra de baixo com Menu + Agendar | botão no cabeçalho, sempre visível | bolha redonda com mensagem da especialista (uma vez por visita) |
| Cabeçalho | some ao descer, volta ao subir | cápsula sempre visível | só a logo, rola junto com a página | fixo, com Agendar + menu | rola junto; depois do topo desce uma barra compacta |

**Depoimentos (Acolhedor):** vêm da ficha, em `"depoimentos": [{ "nome", "detalhe", "texto" }]`. Sem esse campo, a seção e o item do menu somem sozinhos (item de menu com `"requer": "depoimentos"`). Use **só depoimentos reais, com autorização da paciente**, e confirme com a cliente se o conselho profissional dela permite depoimentos na divulgação. Os da Marina são fictícios, só para a demo.

**Título do Essencial:** no texto do título, `[1]` e `[2]` marcam onde entram as fotos em cápsula (`fotos.heroInline`). Ex.: `"Pele [1] *boa*,\nsem mistério [2]"`. No Essencial, `*palavra*` vira destaque em cor (não itálico).

**Cores do Botânico:** o fundo areia e o verde-musgo são fixos do estilo (é a identidade dele); a cor da cliente aparece nos detalhes (palavras em itálico, ícones, preços). Na receita da paleta, um tom com `"h"` próprio não segue a cor da cliente.

### Campos da ficha que só alguns estilos usam
- `profissional.formacao`: lista `{ "ano", "titulo" }` → linha do tempo do **Clínico**.
- Em cada serviço, `indicado` e `sessoes` → aparecem quando o tratamento abre no **Clínico**.
- `horariosSemana` (`{ "seg": "09:00-19:00", ..., "dom": null }`) e `fuso` → tabela da semana e aviso "Aberto agora" do **Botânico**. Sem esse campo, ele mostra só os textos de `horarios`.
- Em qualquer foto, `focoCelular` define outro ponto de foco só no celular (útil quando a foto é deitada e a tela é em pé).
- A galeria do Botânico fica equilibrada com **7 fotos**; com outra quantidade funciona, mas as colunas podem terminar em alturas diferentes.
- As **dúvidas frequentes** do Clínico vêm com respostas genéricas (custo da avaliação, pagamento etc.). **Revise com a cliente** antes de publicar: `"textos": { "faq": { "itens": [ ... ] } }`.

Para criar um estilo novo: crie as peças que faltarem em `src/pecas/`, registre em `src/pecas/index.js` e crie `src/estilos/<nome>/estilo.json` escolhendo as peças.
