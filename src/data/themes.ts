import type { Theme } from '../types'

export const THEMES: Theme[] = [
  {
    id: 'golfe',
    label: 'Golfe',
    emoji: '⛳',
    color: '#3f7d4a',
    angles: [
      'Bastidor de um dia de treino ou de uma rodada',
      'Erro comum + como você corrigiu',
      'Antes/depois de um progresso técnico (swing, tacada, handicap)',
      'Equipamento: o que vale a pena e o que não vale',
      'Reagir a uma jogada profissional recente',
    ],
  },
  {
    id: 'faculdade',
    label: 'Faculdade',
    emoji: '🎓',
    color: '#3763c9',
    angles: [
      'Rotina de estudos / "um dia na minha vida"',
      'Método ou ferramenta que salvou seu semestre',
      'Bastidor de prova, trabalho em grupo ou apresentação',
      'Antes/depois: expectativa x realidade da faculdade',
      'Dica rápida pra quem está entrando no curso',
    ],
  },
  {
    id: 'trabalho',
    label: 'Trabalho',
    emoji: '💼',
    color: '#7a5a34',
    angles: [
      'Bastidor de um projeto ou entrega',
      'Lição aprendida com um erro no trabalho',
      'Ferramenta ou hábito que aumentou sua produtividade',
      'Um dia na minha vida profissional',
      'Antes/depois da carreira: onde comecei x onde estou',
    ],
  },
  {
    id: 'intercambio',
    label: 'Intercâmbio pra China',
    emoji: '🇨🇳',
    color: '#a83c2e',
    angles: [
      'Contagem regressiva + o que está na mala',
      'Expectativa antes de embarcar (medos, ansiedade, planos)',
      'Bastidor da papelada/visto/preparação',
      'Primeiras impressões (guardar pra quando chegar)',
      'Por que escolhi a China / o que mais me anima',
    ],
  },
]
