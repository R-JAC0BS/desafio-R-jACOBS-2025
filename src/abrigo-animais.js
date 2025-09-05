import { animaisParaAdocao } from "./data/dados.js";
import { brinquedosSaoValidos, temBrinquedosNaOrdem } from "./utils.js";

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedosP1 = brinquedosPessoa1.split(',').map(b => b.trim());
    const brinquedosP2 = brinquedosPessoa2.split(',').map(b => b.trim());
    const animaisDesejados = ordemAnimais.split(',').map(a => a.trim());

    if (!brinquedosSaoValidos(brinquedosP1) || !brinquedosSaoValidos(brinquedosP2)) {
      return { erro: 'Brinquedo inválido' };
    }

    const animaisNoAbrigo = new Map(animaisParaAdocao.map(animal => [animal.nomeAnimal, animal]));

    const animaisSaoValidos = (animais) => {
      const animaisDuplicados = (new Set(animais)).size !== animais.length;
      const animaisInvalidos = animais.some(a => !animaisNoAbrigo.has(a));
      return !animaisDuplicados && !animaisInvalidos;
    };

    if (!animaisSaoValidos(animaisDesejados)) {
      return { erro: 'Animal inválido' };
    }

    const adocoesP1 = [];
    const adocoesP2 = [];
    const resultados = [];

    const brinquedoDeGatoUsado = (pessoa, brinquedo) => {
      const adocoes = pessoa === 1 ? adocoesP1 : adocoesP2;
      for (const animalNome of adocoes) {
        const animalAdotado = animaisNoAbrigo.get(animalNome);
        const brinquedosAdotado = animalAdotado.brinquedos.split(',').map(b => b.trim());
        if (animalAdotado.tipo.toLowerCase() === 'gato' && brinquedosAdotado.includes(brinquedo)) {
          return true;
        }
      }
      return false;
    };

    for (const animalNome of animaisDesejados) {
      const animalInfo = animaisNoAbrigo.get(animalNome);
      const brinquedosDesejados = animalInfo.brinquedos;
      let p1Apto = false;
      let p2Apto = false;

      if (adocoesP1.length < 3) {
        let p1PodeAdotar = true;
        for (const brinquedo of brinquedosDesejados.split(',')) {
          if (animalInfo.tipo.toLowerCase() === 'gato' && brinquedoDeGatoUsado(1, brinquedo.trim())) {
            p1PodeAdotar = false;
            break;
          }
        }
        if (p1PodeAdotar && temBrinquedosNaOrdem(brinquedosDesejados, brinquedosP1)) {
          p1Apto = true;
        }
      }

      if (adocoesP2.length < 3) {
        let p2PodeAdotar = true;
        for (const brinquedo of brinquedosDesejados.split(',')) {
          if (animalInfo.tipo.toLowerCase() === 'gato' && brinquedoDeGatoUsado(2, brinquedo.trim())) {
            p2PodeAdotar = false;
            break;
          }
        }
        if (p2PodeAdotar && temBrinquedosNaOrdem(brinquedosDesejados, brinquedosP2)) {
          p2Apto = true;
        }
      }

      if (animalNome === 'Loco' && (adocoesP1.length > 0 || adocoesP2.length > 0)) {
        p1Apto = temBrinquedosNaOrdem(brinquedosDesejados, brinquedosP1);
        p2Apto = temBrinquedosNaOrdem(brinquedosDesejados, brinquedosP2);
      }

      if (p1Apto && p2Apto) {
        resultados.push(`${animalNome} - abrigo`);
      } else if (p1Apto) {
        resultados.push(`${animalNome} - pessoa 1`);
        adocoesP1.push(animalNome);
      } else if (p2Apto) {
        resultados.push(`${animalNome} - pessoa 2`);
        adocoesP2.push(animalNome);
      } else {
        resultados.push(`${animalNome} - abrigo`);
      }
    }

    resultados.sort((a, b) => a.localeCompare(b));

    return { lista: resultados };
  }
}

export { AbrigoAnimais };
