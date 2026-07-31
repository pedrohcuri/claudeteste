export type ThemeId = 'golfe' | 'faculdade' | 'trabalho' | 'intercambio'

export interface Theme {
  id: ThemeId
  label: string
  emoji: string
  color: string
  angles: string[]
  backgrounds: string[]
}

export interface Trend {
  id: string
  platform: 'Instagram' | 'TikTok' | 'Ambos'
  title: string
  description: string
  fetchedAt: string
}

export type IdeaStatus = 'ideia' | 'roteiro' | 'gravado' | 'postado'

export type IdeaFormat = 'padrao' | 'texto7s'

export interface Idea {
  id: string
  themeId: ThemeId
  title: string
  notes: string
  status: IdeaStatus
  trendRef?: string
  format?: IdeaFormat
  createdAt: string
}

// "The Money Talks" — frente separada, conteúdo generalista de mercado/
// carreira/startups. Formato próprio: uma frase de impacto na tela +
// legenda que contextualiza (diferente do padrão gancho+ângulo do resto).
export type MoneyTalkPillarId = 'gastos-viagens'

export interface MoneyTalkPillar {
  id: MoneyTalkPillarId
  label: string
  emoji: string
  tone: string
}

export interface MoneyTalkIdea {
  id: string
  pillar: MoneyTalkPillarId
  phrase: string
  caption: string
  status: IdeaStatus
  createdAt: string
}
