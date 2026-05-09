const container = document.getElementById("table-container");

function carregarJogos(jogosFiltrados = "") {
  if (!container) return;

  const fragment = document.createDocumentFragment();

  function getRodada(data) {
    const dia = parseInt(data.split("/")[0]);

    if (dia <= 17) {
      return 1;
    } else if (dia <= 23) {
      return 2;
    } else {
      return 3;
    }
  }

  let rodadaAtual = null;

  jogosFiltrados.forEach((jogo) => {
    const rodadaDoJogo = getRodada(jogo.data);
    if (rodadaDoJogo !== rodadaAtual) {
      rodadaAtual = rodadaDoJogo;

      const header = document.createElement("h2");
      header.className = "rodada-header";
      header.innerHTML = `⚽ Fase de Grupos - ${rodadaAtual}`;
      fragment.appendChild(header);
    }

    const card = document.createElement("div");
    card.className = "match-card";

    card.innerHTML = `
            <div class="match-date">${jogo.data}</div>
           
            <div class="teams-container">
                <div class="team-box">
                    <a href="${jogo.saibaMais1}" target="_blank">
                        <img src="${jogo.image1}" alt="Bandeira da seleção ${jogo.time1}">
                    </a>
                    <span>${jogo.time1}</span>
                </div>

                <div class="score-box">
                    <span class="score-time1">${jogo.score1}</span>
                    <span class="vs">X</span>
                    <span class="score-time2">${jogo.score2}</span>
                </div>

                <div class="team-box">
                    <a href="${jogo.saibaMais2}" target="_blank">
                        <img src="${jogo.image2}" alt="Bandeira da seleção ${jogo.time2}">
                    </a>
                    <span>${jogo.time2}</span>
                </div>
            </div>
        `;

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

function configurarBusca() {
  const inputBusca = document.getElementById("search-input");
  if (!inputBusca) return;

  function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  inputBusca.addEventListener("input", () => {
    const textoFiltrado = removerAcentos(inputBusca.value.toLowerCase());

    const jogosFiltrados = jogos.filter((jogo) => {
      const time1SemAcento = removerAcentos(jogo.time1.toLowerCase());
      const time2SemAcento = removerAcentos(jogo.time2.toLowerCase());

      return (
        time1SemAcento.includes(textoFiltrado) ||
        time2SemAcento.includes(textoFiltrado) ||
        jogo.data.includes(textoFiltrado)
      );
    });

    container.innerHTML = "";

    if (jogosFiltrados.length === 0) {
      container.innerHTML = `<p>Nenhum jogo encontrado para a busca: <span style="color: red;">${inputBusca.value}</span>.</p>`;
    } else {
      carregarJogos(jogosFiltrados);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  carregarJogos(jogos);
  configurarBusca();
});
