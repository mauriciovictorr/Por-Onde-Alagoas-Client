# Por-Onde-Alagoas-Client

Front-end estático (HTML, CSS e JavaScript em módulos ES) que consome a API corporativa em Spring Boot. Hospedagem prevista na Vercel, sem etapa de build.

## Estrutura

```
.
├── index.html        # Página principal
├── css/
│   └── styles.css    # Estilos e tokens de cor (tema claro/escuro)
├── js/
│   ├── config.js     # URL base da API e timeout (ponto único de configuração)
│   ├── api.js        # Camada de acesso HTTP à API (tratamento de erros e timeout)
│   ├── carrossel.js  # Carrossel principal e rolagem da faixa de destaques
│   └── app.js        # Orquestração da página e renderização
├── vercel.json       # Cabeçalhos de segurança e configuração de deploy
└── README.md
```

## Configuração

1. Defina a URL base da API em [js/config.js](js/config.js).
2. Atualize o domínio `connect-src` na Content-Security-Policy de [vercel.json](vercel.json) para o mesmo host da API.
3. Implemente as funções de acesso aos endpoints em [js/api.js](js/api.js), usando o auxiliar `requisitar`, conforme o contrato da API. A integração ainda não foi implementada.

## Pré-requisitos do backend (Spring Boot)

- Expor a API em HTTPS.
- Liberar CORS para o domínio de produção da Vercel e para o ambiente de preview, por exemplo:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("https://SEU-DOMINIO.vercel.app")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("Accept", "Content-Type");
    }
}
```

Alternativa: usar `rewrites` no `vercel.json` para encaminhar `/api/*` ao backend, eliminando a necessidade de CORS. Avalie com a equipe de Infraestrutura antes de adotar, pois isso altera o caminho de rede da requisição.

## Execução local

Por não haver build, basta servir a pasta com qualquer servidor estático. Exemplo com Python:

```bash
python -m http.server 5500
```

Acesse `http://localhost:5500`. Observação: módulos ES exigem servidor HTTP; abrir o arquivo diretamente pelo navegador (`file://`) não funciona.

## Deploy na Vercel

1. Importar o repositório no painel da Vercel.
2. Framework Preset: **Other**. Build Command e Output Directory: vazios.
3. Cada push na branch `main` gera deploy de produção; demais branches geram previews.

## Próximos passos sugeridos

- Definir contrato da API (OpenAPI/Swagger) e tipar as respostas.
- Adicionar testes de interface e validação de contrato no pipeline.
- Revisar a Content-Security-Policy ao incluir bibliotecas externas.
