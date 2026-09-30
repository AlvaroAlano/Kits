const escapar = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Nos textos das fichas, *palavra* vira itálico e a quebra de linha vira <br>.
export const fmt = (s = '') =>
  escapar(s)
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');

export const semMarcas = (s = '') => String(s).replace(/\*/g, '').replace(/\s*\n\s*/g, ' ');

const numero = new Intl.NumberFormat('pt-BR');

export function preco(item) {
  if (item.preco == null) return { valor: 'sob avaliação', aPartirDe: false };
  return { valor: `R$ ${numero.format(item.preco)}`, aPartirDe: Boolean(item.aPartirDe) };
}

// Caminhos do próprio site ("/clientes/...") ganham o prefixo de publicação
// (ex.: "/Kits" no GitHub Pages). Links externos e âncoras ficam como estão.
export const comBase = (caminho = '') => {
  if (!caminho.startsWith('/') || caminho.startsWith('//')) return caminho;
  return import.meta.env.BASE_URL.replace(/\/$/, '') + caminho;
};

export const linkWhats =(numeroWhats, mensagem) =>
  `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;
