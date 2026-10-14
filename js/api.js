// Camada de acesso à API corporativa (Spring Boot).
// Centraliza URL base, timeout e tratamento de erros HTTP.
import { CONFIG } from "./config.js";

export class ErroApi extends Error {
  constructor(mensagem, status = 0) {
    super(mensagem);
    this.name = "ErroApi";
    this.status = status;
  }
}

/**
 * Executa uma requisição JSON para a API.
 * @param {string} caminho - Caminho relativo, ex.: "/api/itens".
 * @param {RequestInit} opcoes - Opções adicionais do fetch.
 * @returns {Promise<any>} Corpo da resposta já convertido de JSON.
 */
export async function requisitar(caminho, opcoes = {}) {
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), CONFIG.timeoutMs);

  try {
    const resposta = await fetch(`${CONFIG.apiBaseUrl}${caminho}`, {
      ...opcoes,
      signal: controlador.signal,
      headers: {
        Accept: "application/json",
        ...opcoes.headers,
      },
    });

    if (!resposta.ok) {
      throw new ErroApi(`Falha na API (HTTP ${resposta.status}).`, resposta.status);
    }

    return await resposta.json();
  } catch (erro) {
    if (erro.name === "AbortError") {
      throw new ErroApi("A API não respondeu no tempo esperado.");
    }
    if (erro instanceof ErroApi) {
      throw erro;
    }
    throw new ErroApi("Não foi possível conectar à API.");
  } finally {
    clearTimeout(temporizador);
  }
}
