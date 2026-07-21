export type ThemeId = 'golfe' | 'faculdade' | 'trabalho' | 'intercambio'

export interface Theme {
  id: ThemeId
  label: string
  emoji: string
  color: string
  angles: string[]
}

export interface Trend {
  id: string
  platform: 'Instagram' | 'TikTok' | 'Ambos'
  title: string
  description: string
  fetchedAt: string
}

export type IdeaStatus = 'ideia' | 'roteiro' | 'gravado' | 'postado'

export interface Idea {
  id: string
  themeId: ThemeId
  title: string
  notes: string
  status: IdeaStatus
  trendRef?: string
  createdAt: string
}
