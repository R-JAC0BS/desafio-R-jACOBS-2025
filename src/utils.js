const todosBrinquedos = new Set(['RATO', 'BOLA', 'CAIXA', 'NOVELO', 'LASER', 'SKATE']);

function brinquedosSaoValidos(brinquedos) {
  const brinquedosDuplicados = (new Set(brinquedos)).size !== brinquedos.length;
  const brinquedosInvalidos = brinquedos.some(b => !todosBrinquedos.has(b));
  return !brinquedosDuplicados && !brinquedosInvalidos;
}

function temBrinquedosNaOrdem(brinquedosDesejados, brinquedosPessoa) {
  const brinquedosDesejadosArray = brinquedosDesejados.split(',').map(b => b.trim());
  let indexPessoa = 0;
  for (const brinquedoDesejado of brinquedosDesejadosArray) {
    let found = false;
    while (indexPessoa < brinquedosPessoa.length) {
      if (brinquedosPessoa[indexPessoa] === brinquedoDesejado) {
        found = true;
        break;
      }
      indexPessoa++;
    }
    if (!found) {
      return false;
    }
  }
  return true;
}

export { brinquedosSaoValidos, temBrinquedosNaOrdem, todosBrinquedos };
