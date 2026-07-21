# Bora Postar

Dashboard pessoal para organizar ideias de conteúdo para Instagram e TikTok, com foco em quatro temas: golfe, faculdade, trabalho e o intercâmbio para a China.

## O que tem aqui

- **Temas**: cada um vem com ângulos de conteúdo prontos para usar como ponto de partida.
- **Tendências**: painel com formatos e práticas em alta no Instagram/TikTok. É uma lista estática — para atualizar, peça para o Claude buscar tendências recentes e regravar `src/data/trends.json`.
- **Gerador de ideias**: combina um ângulo do tema escolhido com uma tendência para sugerir uma ideia de post, editável antes de salvar.
- **Quadro de conteúdo**: kanban simples (Ideia → Roteiro → Gravado → Postado) para acompanhar o que já foi criado.

Tudo é salvo no `localStorage` do navegador — não há backend nem conta de usuário.

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```
