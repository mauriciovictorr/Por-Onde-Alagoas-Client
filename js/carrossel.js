// Interações da página inicial: carrossel principal (slides) e rolagem da faixa de destaques.
// Sem dependências externas, compatível com a Content-Security-Policy (script-src 'self').

const INTERVALO_MS = 6000;

/**
 * Inicializa o carrossel principal com troca automática, setas e indicadores.
 * A troca automática pausa quando o usuário interage com a área ou quando o sistema
 * solicita redução de movimento.
 * @param {HTMLElement} raiz - Elemento com o atributo data-carrossel.
 */
export function iniciarCarrossel(raiz) {
  const slides = Array.from(raiz.querySelectorAll(".slide"));
  const indicadores = Array.from(raiz.querySelectorAll(".indicador"));
  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let atual = 0;
  let temporizador = null;

  function exibir(indice) {
    atual = (indice + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("ativo", i === atual);
      slide.setAttribute("aria-hidden", String(i !== atual));
    });
    indicadores.forEach((indicador, i) => {
      indicador.classList.toggle("ativo", i === atual);
      indicador.setAttribute("aria-current", String(i === atual));
    });
  }

  function reiniciarAutomatico() {
    clearInterval(temporizador);
    if (!reduzirMovimento) {
      temporizador = setInterval(() => exibir(atual + 1), INTERVALO_MS);
    }
  }

  raiz.querySelector("[data-anterior]").addEventListener("click", () => {
    exibir(atual - 1);
    reiniciarAutomatico();
  });

  raiz.querySelector("[data-proximo]").addEventListener("click", () => {
    exibir(atual + 1);
    reiniciarAutomatico();
  });

  indicadores.forEach((indicador) => {
    indicador.addEventListener("click", () => {
      exibir(Number(indicador.dataset.indice));
      reiniciarAutomatico();
    });
  });

  raiz.addEventListener("mouseenter", () => clearInterval(temporizador));
  raiz.addEventListener("mouseleave", reiniciarAutomatico);

  exibir(0);
  reiniciarAutomatico();
}

/**
 * Liga as setas de navegação horizontal ao trilho de cards.
 * @param {HTMLElement} container - Elemento que contém o trilho e as setas.
 */
export function iniciarTrilho(container) {
  const trilho = container.querySelector("[data-trilho]");
  const passo = () => Math.max(trilho.clientWidth * 0.8, 200);

  container.querySelector("[data-trilho-anterior]").addEventListener("click", () => {
    trilho.scrollBy({ left: -passo(), behavior: "smooth" });
  });

  container.querySelector("[data-trilho-proximo]").addEventListener("click", () => {
    trilho.scrollBy({ left: passo(), behavior: "smooth" });
  });
}
