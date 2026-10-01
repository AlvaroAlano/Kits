// Propostas favoritadas pela cliente, guardadas no navegador dela (uma lista por ficha).
// O acesso ao armazenamento pode falhar (aba anônima, navegador bloqueando), por isso os try.

const chave = (cliente) => `favoritos:${cliente}`;

export function lerFavoritos(cliente) {
  try {
    const lista = JSON.parse(localStorage.getItem(chave(cliente)) ?? '[]');
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

export function alternarFavorito(cliente, estilo) {
  const lista = lerFavoritos(cliente);
  const posicao = lista.indexOf(estilo);
  if (posicao >= 0) lista.splice(posicao, 1);
  else lista.push(estilo);
  try {
    localStorage.setItem(chave(cliente), JSON.stringify(lista));
  } catch {}
  return lista.includes(estilo);
}
