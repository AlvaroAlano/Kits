// Gera a paleta de um estilo a partir da cor da cliente.
// Da cor da cliente usamos só o matiz (e um pouco da intensidade); a claridade e a
// saturação de cada tom vêm da receita do estilo. Assim qualquer cor fica elegante.

const limitar = (v, min, max) => Math.min(max, Math.max(min, v));

function hexParaRgb(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255);
}

const paraLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const paraSrgb = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

function rgbParaOklch(rgb) {
  const [r, g, b] = rgb.map(paraLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { l: L, c: Math.hypot(A, B), h: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 };
}

function oklchParaLinear({ l, c, h }) {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l3 = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m3 = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s3 = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  ];
}

// Reduz o croma até a cor caber no sRGB, mantendo claridade e matiz.
function oklchParaHex(cor) {
  let c = cor.c;
  let rgb = oklchParaLinear(cor);
  while (c > 0 && rgb.some((v) => v < -0.0001 || v > 1.0001)) {
    c = Math.max(0, c - 0.002);
    rgb = oklchParaLinear({ ...cor, c });
  }
  return (
    '#' +
    rgb
      .map((v) => Math.round(limitar(paraSrgb(limitar(v, 0, 1)), 0, 1) * 255).toString(16).padStart(2, '0'))
      .join('')
  );
}

export function gerarPaleta(corCliente, receita, sobrescritas = {}) {
  const base = rgbParaOklch(hexParaRgb(corCliente));
  // Cores quase cinza geram paletas neutras; cores médias ou vivas usam a receita inteira.
  const intensidade = limitar(base.c / 0.06, 0.1, 1);
  const paleta = {};
  for (const [nome, { l, c, h }] of Object.entries(receita)) {
    // Um tom com "h" próprio é a assinatura do estilo (ex.: areia e musgo no Botânico) e não segue a cliente.
    paleta[nome] = h == null ? oklchParaHex({ l, c: c * intensidade, h: base.h }) : oklchParaHex({ l, c, h });
  }
  return { ...paleta, ...sobrescritas };
}

export function comAlfa(hex, alfa) {
  const [r, g, b] = hexParaRgb(hex).map((v) => Math.round(v * 255));
  return `rgb(${r} ${g} ${b} / ${alfa})`;
}
