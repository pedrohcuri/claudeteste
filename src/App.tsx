import { useMemo, useState } from 'react'
import { THEMES } from './data/themes'
import type { Idea, IdeaStatus, Theme } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'
import { ThemeCard } from './components/ThemeCard'
import { TrendsPanel } from './components/TrendsPanel'
import { IdeaGenerator } from './components/IdeaGenerator'
import { KanbanBoard } from './components/KanbanBoard'

const NUDGES = [
  'Postar imperfeito hoje vale mais que postar perfeito nunca.',
  'Ninguém lembra do vídeo com áudio ruim. Lembram de quem apareceu.',
  'Seu intercâmbio pra China vai passar rápido — documenta agora, edita depois.',
  'Um post por semana em 1 ano são 52 pedaços da sua história.',
  'A tacada boa de hoje é conteúdo. Filma.',
]

function App() {
  const [ideas, setIdeas] = useLocalStorage<Idea[]>('bora-postar:ideas', [])
  const [selectedThemeId, setSelectedThemeId] = useState<Theme['id'] | null>(null)
  const nudge = useMemo(() => NUDGES[Math.floor(Math.random() * NUDGES.length)], [])

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Bora Postar 🚀</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">{nudge}</p>
          {postadoCount > 0 && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
              Você já postou {postadoCount} {postadoCount === 1 ? 'ideia' : 'ideias'}. Continua assim!
            </p>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Sobre o que você quer postar hoje?
          </h2>
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

        <TrendsPanel />

        <KanbanBoard ideas={ideas} themesById={themesById} onMove={moveIdea} onDelete={deleteIdea} />
      </main>
    </div>
  )
}

export default App
