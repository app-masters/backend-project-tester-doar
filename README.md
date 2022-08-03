# Test Backend Remote

## Objetivo

Projeto para testar APIs REST desenvolvidas para o processo de seleção de estagiários.

## Estrutura

Código desenvolvido em Typescript e Jest como framework de test.

## Como usar

Baixe este repositório, instale as dependências com:

```bash
yarn
```

### Teste API Única

para executar o test rode o seguinte comando

```bash
yarn test --url=http://url.da.sua.api
```

Ao final dos testes serão exibidos os erros e acertos, e será apresentada uma pontuação do projeto.

---

### Teste Várias APIs

crie um arquivo chamado `urls.json` na pasta `src/` com as URLs das APIs a serem testadas.

```json
{
  "urls": [
    {
      "name"?: string,
      "url": "https://path.domain.example"
    }
  ]
}
```

após definir as URLs, para executar o test rode o seguinte comando

```bash
yarn testAll
```

Ao final dos testes é gerado um arquivo `grades.json` com as notas dos testes.

```json
{
  "grades": [
    {
      "name"?: string,
      "url": string,
      "grade": number,
      "asserts": string,
    }
  ]
}
```
