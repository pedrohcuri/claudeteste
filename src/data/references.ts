// Referências reais de criadores fora dos seus nichos — o objetivo aqui não
// é o assunto deles, é a técnica de produção por trás, pra você adaptar.
export interface Reference {
  name: string
  knownFor: string
  technique: string
  howToApply: string
}

export const REFERENCES: Reference[] = [
  {
    name: 'Casey Neistat',
    knownFor: 'Vlogger pioneiro, YouTube',
    technique:
      'Corta qualquer pausa morta com jump cuts constantes; aproxima bruscamente a câmera pra intensificar um momento ("Neistat Zoom"); corta no meio de uma frase pra criar energia entre cenas.',
    howToApply:
      'Grave num take só, sem se preocupar em falar perfeito, e corte os silêncios/hesitações depois. O ritmo nasce na edição, não na gravação.',
  },
  {
    name: 'Emma Chamberlain',
    knownFor: 'Lifestyle/vlog, YouTube',
    technique:
      'Deixa erros e silêncios estranhos no corte de propósito, dá zoom exagerado no próprio rosto pra reagir a algo, usa texto na tela pra pontuar o que está pensando.',
    howToApply:
      'Não corte a parte "ruim". Um deslize ou uma reação exagerada sua, deixada no vídeo, passa mais autenticidade do que uma gravação perfeita.',
  },
  {
    name: 'MrBeast',
    knownFor: 'Vídeos de desafio/resultado, YouTube',
    technique:
      'Mostra o resultado ou a ação antes de explicar qualquer coisa; troca o enquadramento a cada 10-15s no início; relembra o objetivo do vídeo ao longo dele pra manter a atenção.',
    howToApply:
      'Comece pelo resultado ("terminei com handicap X" / "consegui o visto") e só depois conta como chegou lá — gancho antes de contexto, não o contrário.',
  },
  {
    name: 'Khaby Lame',
    knownFor: 'Comédia silenciosa, TikTok',
    technique:
      'Estrutura idêntica repetida em milhares de vídeos: reage sem falar, faz a versão simples da solução, fecha com o mesmo gesto reconhecível.',
    howToApply:
      'Crie um "formato assinatura" seu — mesma abertura, mesmo tipo de corte final — e repita. Reconhecimento vem de consistência, não de reinventar toda vez.',
  },
]
