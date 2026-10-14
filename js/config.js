// Configurações centralizadas do front-end.
// Ajuste a URL base conforme o ambiente da API Spring Boot (sem barra final).
// Em produção, a URL deve ser HTTPS e o backend deve liberar CORS para o domínio da Vercel.
export const CONFIG = {
  apiBaseUrl: "https://api.exemplo.com.br",
  timeoutMs: 10000,
};
