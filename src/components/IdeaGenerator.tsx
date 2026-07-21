import { useState } from 'react'
import type { Idea, Theme } from '../types'
import { trends } from './TrendsPanel'

interface Props {
  theme: Theme | null
  onAdd: (idea: Idea) => void
}

function pickRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)]
}

export function IdeaGenerator({ theme, onAdd }: Props) {
  const [draft, setDraft] = useState('')
  const [trendId, setTrendId] = useState<string>('')

  if (!theme) {
    return (
      <section className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-center text-slate-500">
        Escolha um tema acima para gerar uma ideia de post.
      </section>
    )
  }

  function generate() {
    const angle = pickRandom(theme!.angles)
    const trend = trendId ? trends.find((t) => t.id === trendId) : pickRandom(trends)
    setTrendId(trend?.id ?? '')
    setDraft(`${angle}${trend ? ` — inspirado em "${trend.title}"` : ''}`)
  }

  function add() {
    if (!draft.trim()) return
    onAdd({
      id: crypto.randomUUID(),
      themeId: theme!.id,
      title: draft.trim(),
      notes: '',
      status: 'ideia',
      trendRef: trendId || undefined,
      createdAt: new Date().toISOString(),
    })
    setDraft('')
  }

  return (
    <section className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Gerar ideia · {theme.emoji} {theme.label}
        </h2>
        <button
          onClick={generate}
          className="text-sm font-medium px-3 py-1.5 rounded-lg text-white"
          style={{ backgroundColor: theme.color }}
        >
          Gerar ideia
        </button>
      </div>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Clique em 'Gerar ideia' ou escreva a sua própria..."
        rows={3}
        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent p-3 text-sm text-slate-900 dark:text-slate-100"
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={add}
          disabled={!draft.trim()}
          className="text-sm font-medium px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 disabled:opacity-40 text-slate-900 dark:text-slate-100"
        >
          Adicionar ao quadro
        </button>
      </div>
    </section>
  )
}
