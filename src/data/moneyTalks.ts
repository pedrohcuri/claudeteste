import type { MoneyTalkPillar, MoneyTalkPillarId } from '../types'

export const MONEY_TALK_PILLARS: MoneyTalkPillar[] = [
  { id: 'gastos-viagens', label: 'Gastos & Viagens', emoji: '🧳', tone: 'humor' },
]

export interface MoneyTalkPair {
  phrase: string
  caption: string
}

export const MONEY_TALK_BANK: Record<MoneyTalkPillarId, MoneyTalkPair[]> = {
  'gastos-viagens': [
    {
      phrase: 'Câmbio é a droga mais cara que você já usou.',
      caption:
        '"200 reais? Ah, é só uns 40 dólares." E é assim que todo mundo quebra em viagem — o cérebro não sabe fazer conta em moeda estrangeira, só sabe gastar.\n\nThe Money Talks. 🎢\n#viagem #psicologiadodinheiro #cambio #financaspessoais',
    },
    {
      phrase: 'Duty free não existe. É só uma loja com luz melhor.',
      caption:
        'Você não "economiza" comprando no duty free. Você gasta dinheiro que não ia gastar, num lugar desenhado pra você achar que tá economizando.\n\nThe Money Talks. 🎢\n#dutyfree #viagem #consumo #psicologiadodinheiro',
    },
    {
      phrase: '"Já que vim até aqui" já causou mais prejuízo que qualquer crise.',
      caption:
        'Sunk cost fallacy com nome de brasileiro em viagem: já que vim até aqui, vou comprar, vou fazer o passeio caro. Ninguém tá calculando, todo mundo tá sentindo.\n\nThe Money Talks. 🎢\n#viagem #decisoes #psicologiadodinheiro #financaspessoais',
    },
    {
      phrase: 'Seu cartão de crédito adora fuso horário diferente.',
      caption:
        'Você gasta mais tranquilo em viagem porque a fatura chega depois, num fuso que já nem é o seu. Distância até da sua própria consciência financeira.\n\nThe Money Talks. 🎢\n#cartaodecredito #viagem #financaspessoais #humor',
    },
    {
      phrase: 'Orçamento de viagem é ficção assinada por você mesmo.',
      caption:
        'Todo mundo faz planilha antes de viajar. Ninguém olha ela depois do segundo dia. É o documento mais respeitado e mais ignorado da sua vida financeira.\n\nThe Money Talks. 🎢\n#orcamento #viagem #planilha #financaspessoais',
    },
    {
      phrase: '"Tá baratinho aqui" é a pior taxa de câmbio que existe.',
      caption:
        'Não importa o país — sempre tem alguém dizendo que "aqui é barato" bem na hora que você tá prestes a gastar demais. Relatividade é ótima pra física, péssima pro bolso.\n\nThe Money Talks. 🎢\n#viagem #financaspessoais #psicologiadodinheiro',
    },
    {
      phrase: 'Suvenir é o imposto que você paga por ter viajado.',
      caption:
        'Ninguém precisa do ímã de geladeira. Todo mundo compra o ímã de geladeira. É basicamente uma taxa emocional obrigatória.\n\nThe Money Talks. 🎢\n#viagem #suvenir #consumo #humor',
    },
    {
      phrase: 'Você não perdeu dinheiro na viagem. Você investiu em arrependimento.',
      caption:
        'Aquela compra por impulso no free shop, aquele passeio que você nem queria — não foi gasto, foi um investimento de retorno negativo e garantido.\n\nThe Money Talks. 🎢\n#financaspessoais #viagem #psicologiadodinheiro #humor',
    },
    {
      phrase: 'App de conversão de moeda é terapia de choque.',
      caption:
        'Você abre o app, faz a conta, e o valor em real aparece bem na hora que você já apertou "comprar". Missão do app cumprida: te arrepender depois.\n\nThe Money Talks. 🎢\n#viagem #app #financaspessoais #humor',
    },
    {
      phrase: '"Vou usar por meses" é a frase mais cara do aeroporto.',
      caption:
        'Todo produto no aeroporto vem com a promessa de que "vai usar por meses". 90% vira gaveta em 2 semanas.\n\nThe Money Talks. 🎢\n#aeroporto #viagem #consumo #financaspessoais',
    },
  ],
}
