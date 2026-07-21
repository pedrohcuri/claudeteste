import { useEffect, useRef, useState } from 'react'
import type { Idea, Theme } from '../types'
import { trends } from './TrendsPanel'
import { HOOKS } from '../data/hooks'

interface Props {
  theme: Theme | null
  onAdd: (idea: Idea) => void
}

interface Combo {
  key: string
  hook: string
  angle: string
  trendTitle: string
  trendId: string
}

const BATCH_SIZE = 6

function shuffle<T>(list: T[]): T[] {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function allCombos(theme: Theme): Combo[] {
  const combos: Combo[] = []
  for (const angle of theme.angles) {
    for (const hook of HOOKS) {
      for (const trend of trends) {
        combos.push({
          key: `${angle}|${hook}|${trend.id}`,
          hook,
          angle,
          trendTitle: trend.title,
          trendId: trend.id,
        })
      }
    }
  }
  return combos
}

function comboToTitle(c: Combo) {
  return `${c.hook} ${c.angle} — inspirado em "${c.trendTitle}"`
}

export function IdeaGenerator({ theme, onAdd }: Props) {
  const [batch, setBatch] = useState<Combo[]>([])
  const [addedKeys, setAddedKeys] = useState<Set<string>>(new Set())
  const [draft, setDraft] = useState('')
  const usedByTheme = useRef<Record<string, Set<string>>>({})

  useEffect(() => {
    setBatch([])
    setAddedKeys(new Set())
  }, [theme?.id])

  if (!theme) {
    return (
      <section
        className="p-6 text-center text-sm"
        style={{ border: '1px dashed var(--line)', color: 'var(--text-faint)', borderRadius: '3px' }}
      >
        Escolha um tema acima para gerar ideias de post.
      </section>
    )
  }

  function generateBatch() {
    const combos = allCombos(theme!)
    const used = usedByTheme.current[theme!.id] ?? new Set<string>()
    let available = combos.filter((c) => !used.has(c.key))
    if (available.length < BATCH_SIZE) {
      used.clear()
      available = combos
    }
    const picked = shuffle(available).slice(0, BATCH_SIZE)
    picked.forEach((c) => used.add(c.key))
    usedByTheme.current[theme!.id] = used
    setBatch(picked)
    setAddedKeys(new Set())
  }

  function addCombo(c: Combo) {
    onAdd({
      id: crypto.randomUUID(),
      themeId: theme!.id,
      title: comboToTitle(c),
      notes: '',
      status: 'ideia',
      trendRef: c.trendId,
      createdAt: new Date().toISOString(),
    })
    setAddedKeys((prev) => new Set(prev).add(c.key))
  }

  function addDraft() {
    if (!draft.trim()) return
    onAdd({
      id: crypto.randomUUID(),
      themeId: theme!.id,
      title: draft.trim(),
      notes: '',
      status: 'ideia',
      createdAt: new Date().toISOString(),
    })
    setDraft('')
  }

  return (
    <section className="panel p-4">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h2 className="eyebrow flex items-center gap-2">
          <span className="text-base leading-none">{theme.emoji}</span>
          Gerar ideias · {theme.label}
        </h2>
        <button onClick={generateBatch} className="btn btn-accent focus-ring shrink-0">
          {batch.length === 0 ? `Gerar ${BATCH_SIZE} ideias` : `Gerar outras ${BATCH_SIZE}`}
        </button>
      </div>

      {batch.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--text-faint)' }}>
          Clique em “Gerar {BATCH_SIZE} ideias” pra ver opções — nenhuma se repete até você esgotar as combinações do
          tema.
        </p>
      ) : (
        <ul className="space-y-2 mb-4">
          {batch.map((c) => {
            const added = addedKeys.has(c.key)
            return (
              <li
                key={c.key}
                className="flex items-start justify-between gap-3 p-3"
                style={{ border: '1px solid var(--line)', borderRadius: '3px' }}
              >
                <div className="text-sm">
                  <p style={{ color: 'var(--text)' }}>
                    <span className="font-semibold">{c.hook}</span> {c.angle}
                  </p>
                  <p className="eyebrow mt-1" style={{ color: 'var(--text-faint)' }}>
                    formato: {c.trendTitle}
                  </p>
                </div>
                <button
                  onClick={() => addCombo(c)}
                  disabled={added}
                  className="btn btn-outline focus-ring shrink-0"
                >
                  {added ? 'Adicionada ✓' : 'Adicionar'}
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <div className="pt-3" style={{ borderTop: '1px solid var(--line-soft)' }}>
        <p className="eyebrow mb-2" style={{ color: 'var(--text-faint)' }}>
          ou escreva a sua
        </p>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Escreva sua própria ideia..."
          rows={2}
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
          <button onClick={addDraft} disabled={!draft.trim()} className="btn btn-outline focus-ring">
            Adicionar ao quadro
          </button>
        </div>
      </div>
    </section>
  )
}
