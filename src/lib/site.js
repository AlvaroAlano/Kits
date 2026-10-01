import { gerarPaleta, comAlfa } from './cor.js';
import { linkWhats } from './texto.js';
import kit from '../kit.json';

const fichas = import.meta.glob('../clientes/*.json', { eager: true, import: 'default' });
const arquivosEstilo = import.meta.glob('../estilos/*/estilo.json', { eager: true, import: 'default' });

export const clientes = Object.values(fichas);
export const estilos = Object.fromEntries(Object.values(arquivosEstilo).map((e) => [e.id, e]));

const MENSAGENS = {
  agendar: 'Olá! Vim pelo site e gostaria de agendar uma avaliação.',
  servico: 'Olá! Vim pelo site e gostaria de saber mais sobre {servico}.',
};

const ehObjeto = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// A ficha da cliente sobrescreve o padrão do estilo; listas são trocadas inteiras.
function mesclar(base, extra) {
  if (!ehObjeto(base) || !ehObjeto(extra)) return extra ?? base;
  const saida = { ...base };
  for (const [chave, valor] of Object.entries(extra)) {
    saida[chave] = ehObjeto(valor) && ehObjeto(base[chave]) ? mesclar(base[chave], valor) : valor;
  }
  return saida;
}

// Troca {cidade}, {profissional} etc. pelos dados da ficha.
function preencher(valor, vars) {
  if (typeof valor === 'string') return valor.replace(/\{(\w+)\}/g, (marca, chave) => (chave in vars ? vars[chave] : marca));
  if (Array.isArray(valor)) return valor.map((v) => preencher(v, vars));
  if (ehObjeto(valor)) return Object.fromEntries(Object.entries(valor).map(([k, v]) => [k, preencher(v, vars)]));
  return valor;
}

export function estilosDoCliente(cliente) {
  return (cliente.estilos ?? Object.keys(estilos)).filter((id) => estilos[id]);
}

// Ordem em que as propostas aparecem para a cliente: a recomendada sempre primeiro
export function ordemPropostas(cliente) {
  const ids = estilosDoCliente(cliente);
  const recomendado = cliente.recomendado;
  return recomendado && ids.includes(recomendado) ? [recomendado, ...ids.filter((id) => id !== recomendado)] : ids;
}

export function montarSite(cliente, estiloId) {
  const estilo = estilos[estiloId];
  const ano = new Date().getFullYear();
  const { profissional, endereco, contato } = cliente;

  const vars = {
    nome: cliente.nome,
    segmento: cliente.segmento,
    cidade: endereco.cidade,
    uf: endereco.uf,
    bairro: endereco.bairro,
    profissional: profissional.nome,
    primeiroNome: profissional.nome.split(' ')[0],
    titulo: profissional.titulo,
    registro: profissional.registro,
    desde: profissional.desde,
    anos: ano - profissional.desde,
  };

  const textos = preencher(mesclar(estilo.textos, cliente.textos ?? {}), vars);
  const fotos = mesclar(estilo.fotos, cliente.fotos ?? {});
  const mensagens = preencher(mesclar(MENSAGENS, cliente.mensagens ?? {}), vars);

  const cores = gerarPaleta(cliente.cor, estilo.paleta, cliente.cores);
  const paleta = {
    ...cores,
    linha: comAlfa(cores.tinta, 0.14),
    linhaForte: comAlfa(cores.tinta, 0.34),
    linhaEscuro: comAlfa(cores.sobreEscuro, 0.16),
    sobreEscuroSuave: comAlfa(cores.sobreEscuro, 0.68),
    fundoVidro: comAlfa(cores.fundo, 0.9),
    fundoTranslucido: comAlfa(cores.fundo, 0.32),
  };

  const enderecoCompleto = `${endereco.linha1}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}, ${endereco.cep}`;

  // "Gostei desta" (só nas demos): avisa no WhatsApp de quem está apresentando as propostas
  const propostas = { ...kit.propostas, ...(cliente.propostas ?? {}) };
  const mensagemGostei = propostas.mensagem.replace('{estilo}', estilo.nome).replace('{cliente}', cliente.nome);

  // Itens do menu com "requer" só aparecem se a ficha tiver esse dado (ex.: depoimentos)
  const menu = estilo.menu.filter((item) => {
    if (!item.requer) return true;
    const valor = cliente[item.requer];
    return Array.isArray(valor) ? valor.length > 0 : Boolean(valor);
  });

  return {
    estilo: { ...estilo, menu },
    cliente,
    textos,
    fotos,
    paleta,
    ano,
    demo: Boolean(cliente.demo),
    recomendado: cliente.recomendado === estiloId,
    servicos: cliente.servicos ?? [],
    links: {
      agendar: linkWhats(contato.whatsapp, mensagens.agendar),
      servico: (nome) => linkWhats(contato.whatsapp, mensagens.servico.replace('{servico}', nome.toLowerCase())),
      whats: `https://wa.me/${contato.whatsapp}`,
      instagram: contato.instagram ? `https://instagram.com/${contato.instagram}` : null,
      maps: endereco.mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`,
      waze: endereco.wazeUrl ?? `https://waze.com/ul?q=${encodeURIComponent(enderecoCompleto)}&navigate=yes`,
      gostei: propostas.whatsapp ? linkWhats(propostas.whatsapp, mensagemGostei) : null,
      mapaEmbed: endereco.mapaEmbed ?? `https://www.google.com/maps?q=${encodeURIComponent(enderecoCompleto)}&output=embed`,
    },
  };
}
