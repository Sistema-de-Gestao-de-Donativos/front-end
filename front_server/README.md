## Executando o projeto

Para instalar as dependências:
```bash
npm install
```

Para executar o servidor de front-end:
```bash
npm start
```

O servidor se iniciará em ambiente de desenvolvimento (`localhost` na porta `3000`). Abra o browser e acesse http://localhost:3000/.

## Importante
Precisamos fazer o front baseado em **HTTPS, não HTTP**!

## Estrutura do projeto
- Colocar telas na pasta `src/pages`.
- Colocar componentes reutilizáveis entre telas na pasta `src/components`.
- Colocar arquivos estáticos (arquivos HTML, CSS, imagens etc.) na pasta `public`.
- O ponto de entrada do projeto é o arquivo `src/index.js`.