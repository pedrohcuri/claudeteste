import { useMemo, useState } from 'react'
import { THEMES } from './data/themes'
import type { Idea, IdeaStatus, MoneyTalkIdea, Theme } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'
import { ThemeCard } from './components/ThemeCard'
import { TrendsPanel } from './components/TrendsPanel'
import { ReferencePanel } from './components/ReferencePanel'
import { IdeaGenerator } from './components/IdeaGenerator'
import { TextStoryGenerator } from './components/TextStoryGenerator'
import { KanbanBoard } from './components/KanbanBoard'
import { MoneyTalksGenerator } from './components/MoneyTalksGenerator'
import { TipListPanel } from './components/TipListPanel'
import { MoneyTalksBoard } from './components/MoneyTalksBoard'

const NUDGES = [
  'Postar imperfeito hoje vale mais que postar perfeito nunca.',
  'Ninguém lembra do vídeo com áudio ruim. Lembram de quem apareceu.',
  'Seu intercâmbio pra China vai passar rápido — documenta agora, edita depois.',
  'Um post por semana em 1 ano são 52 pedaços da sua história.',
  'A tacada boa de hoje é conteúdo. Filma.',
]

const MONTHS = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']

function todayTimecode() {
  const d = new Date()
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

function App() {
  const [ideas, setIdeas] = useLocalStorage<Idea[]>('bora-postar:ideas', [])
  const [moneyIdeas, setMoneyIdeas] = useLocalStorage<MoneyTalkIdea[]>('money-talks:ideas', [])
  const [selectedThemeId, setSelectedThemeId] = useState<Theme['id'] | null>(null)
  const nudge = useMemo(() => NUDGES[Math.floor(Math.random() * NUDGES.length)], [])
  const today = useMemo(() => todayTimecode(), [])

  const themesById = useMemo(
    () => Object.fromEntries(THEMES.map((t) => [t.id, t])) as Record<string, Theme>,
    [],
  )
  const selectedTheme = selectedThemeId ? themesById[selectedThemeId] : null
  const postadoCount = ideas.filter((i) => i.status === 'postado').length

  function addIdea(idea: Idea) {
    setIdeas((prev) => [idea, ...prev])
  }

  function moveIdea(id: string, status: IdeaStatus) {
    setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)))
  }

  function deleteIdea(id: string) {
    setIdeas((prev) => prev.filter((i) => i.id !== id))
  }

  function addMoneyIdea(idea: MoneyTalkIdea) {
    setMoneyIdeas((prev) => [idea, ...prev])
  }

  function moveMoneyIdea(id: string, status: IdeaStatus) {
    setMoneyIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)))
  }

  function deleteMoneyIdea(id: string) {
    setMoneyIdeas((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper-raised)' }}>
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rec-dot" aria-hidden="true" />
                <h1
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
                >
                  Bora Postar
                </h1>
              </div>
              <p className="mt-1.5 text-sm max-w-md" style={{ color: 'var(--text-soft)' }}>
                {nudge}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="eyebrow timecode">{today}</div>
              {postadoCount > 0 && (
                <div className="timecode text-sm mt-1" style={{ color: 'var(--accent)' }}>
                  {String(postadoCount).padStart(2, '0')} postad{postadoCount === 1 ? 'a' : 'as'}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        <section>
          <h2 className="eyebrow mb-3">Sobre o que você quer postar hoje?</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {THEMES.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                active={theme.id === selectedThemeId}
                onPick={(t) => setSelectedThemeId(t.id === selectedThemeId ? null : t.id)}
              />
            ))}
          </div>
        </section>

        <IdeaGenerator theme={selectedTheme} onAdd={addIdea} />

        <TextStoryGenerator theme={selectedTheme} onAdd={addIdea} />

        <TrendsPanel />

        <ReferencePanel />

        <KanbanBoard ideas={ideas} themesById={themesById} onMove={moveIdea} onDelete={deleteIdea} />
      </main>

      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-3 py-2" aria-hidden="true">
          <div className="flex-1" style={{ borderTop: '1px dashed var(--line)' }} />
          <span className="eyebrow" style={{ color: 'var(--text-faint)' }}>
            outra frente
          </span>
          <div className="flex-1" style={{ borderTop: '1px dashed var(--line)' }} />
        </div>
      </div>

      <section style={{ borderTop: '1px solid var(--line)', background: 'var(--paper-raised)' }}>
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl leading-none">🎢</span>
              <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
                The Money Talks
              </h2>
            </div>
            <p className="mt-1 text-sm max-w-md" style={{ color: 'var(--text-soft)' }}>
              Conteúdo generalista de mercado, carreira e startups. Formato: uma frase de impacto + legenda que
              contextualiza — não o gancho+ângulo do resto do app.
            </p>
          </div>

          <TipListPanel onAdd={addMoneyIdea} />

          <MoneyTalksGenerator onAdd={addMoneyIdea} />

          <MoneyTalksBoard ideas={moneyIdeas} onMove={moveMoneyIdea} onDelete={deleteMoneyIdea} />
        </div>
      </section>

      <footer className="max-w-5xl mx-auto px-4 py-8">
        <p className="eyebrow" style={{ color: 'var(--text-faint)' }}>
          Bora Postar · salvo neste navegador
        </p>
      </footer>
    </div>
  )
}

export default App
