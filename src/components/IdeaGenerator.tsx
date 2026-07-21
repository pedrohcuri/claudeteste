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
      <section
        className="p-6 text-center text-sm"
        style={{ border: '1px dashed var(--line)', color: 'var(--text-faint)', borderRadius: '3px' }}
      >
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
    <section className="panel p-4">
      <div className="flex items-center justify-between mb-3 gap-3">
        <h2 className="eyebrow flex items-center gap-2">
          <span className="text-base leading-none">{theme.emoji}</span>
          Gerar ideia · {theme.label}
        </h2>
        <button onClick={generate} className="btn btn-accent focus-ring shrink-0">
          Gerar ideia
        </button>
      </div>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Clique em “Gerar ideia” ou escreva a sua própria..."
        rows={3}
        className="focus-ring w-full p-3 text-sm"
        style={{
          background: 'transparent',
          border: '1px solid var(--line)',
          borderRadius: '3px',
          color: 'var(--text)',
          resize: 'vertical',
        }}
      />
      <div className="flex justify-end mt-2">
        <button onClick={add} disabled={!draft.trim()} className="btn btn-outline focus-ring">
          Adicionar ao quadro
        </button>
      </div>
    </section>
  )
}
