// Ponto de entrada da página.
// A integração com a API ainda não foi implementada: a página exibe o estado inicial.

const elementos = {
  botaoAtualizar: document.getElementById("btn-atualizar"),
  status: document.getElementById("status"),
  lista: document.getElementById("lista"),
  mensagem: document.getElementById("mensagem"),
};

/** Exibe mensagem de estado abaixo da lista. */
function exibirMensagem(texto, erro = false) {
  elementos.mensagem.textContent = texto;
  elementos.mensagem.classList.toggle("erro", erro);
  elementos.mensagem.hidden = !texto;
}

function iniciar() {
  elementos.lista.replaceChildren();
  elementos.status.textContent = "";
  exibirMensagem("Integração com a API ainda não disponível.");
  elementos.botaoAtualizar.disabled = true;
}

iniciar();
