// Pares de texto para o formato "story em texto": 7s, sem rosto e sem voz —
// só uma virada de expectativa em duas frases sobre um fundo visual em loop.
// Busca em alta (jul/2026): TikTok reporta +1000% nas buscas por "vídeo de
// 7 segundos" no Creator Search Insights.
export interface TextPair {
  setup: string
  payoff: string
}

export const TEXT_PAIRS: TextPair[] = [
  { setup: 'Isso não era pra acontecer assim.', payoff: 'Foi a melhor virada que podia ter.' },
  { setup: 'Quase desisti no meio do caminho.', payoff: 'Terminei e nem acredito que consegui.' },
  { setup: 'Ninguém falou que ia ser assim.', payoff: 'E foi exatamente por isso que valeu.' },
  { setup: 'Eu não tava preparado pra isso.', payoff: 'Topei mesmo assim.' },
  { setup: '3 meses atrás eu não imaginava isso.', payoff: 'Hoje é a minha realidade.' },
  { setup: 'Tinha medo de não dar conta.', payoff: 'Deu — e mais do que eu esperava.' },
  { setup: 'Todo mundo achou que eu ia desistir.', payoff: 'Eu também achei, por um segundo.' },
  { setup: 'Isso começou meio sem querer.', payoff: 'Virou a parte que eu mais gosto.' },
  { setup: 'Não sabia se ia postar isso.', payoff: 'Mas achei que alguém precisava ver.' },
  { setup: 'O plano era bem diferente.', payoff: 'Esse foi bem melhor.' },
  { setup: 'Guardei isso pra mim por um tempo.', payoff: 'Chegou a hora de contar.' },
  { setup: 'Achei que fosse só mais um dia.', payoff: 'Virou um dos que eu não esqueço.' },
]
