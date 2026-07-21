import { useEffect, useRef, useState } from 'react'
import type { Idea, Theme } from '../types'
import { TEXT_PAIRS } from '../data/textStories'

interface Props {
  theme: Theme | null
  onAdd: (idea: Idea) => void
}

interface Combo {
  key: string
  setup: string
  payoff: string
  background: string
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
  for (const pair of TEXT_PAIRS) {
    for (const background of theme.backgrounds) {
      combos.push({
        key: `${pair.setup}|${pair.payoff}|${background}`,
        setup: pair.setup,
        payoff: pair.payoff,
        background,
      })
    }
  }
  return combos
}

function comboToTitle(c: Combo) {
  return `"${c.setup}" → "${c.payoff}" · fundo: ${c.background}`
}

export function TextStoryGenerator({ theme, onAdd }: Props) {
  const [batch, setBatch] = useState<Combo[]>([])
  const [addedKeys, setAddedKeys] = useState<Set<string>>(new Set())
  const usedByTheme = useRef<Record<string, Set<string>>>({})

  useEffect(() => {
    setBatch([])
    setAddedKeys(new Set())
  }, [theme?.id])

  if (!theme) return null

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
      format: 'texto7s',
      createdAt: new Date().toISOString(),
    })
    setAddedKeys((prev) => new Set(prev).add(c.key))
  }

  return (
    <section className="panel p-4">
      <div className="flex items-start justify-between mb-1 gap-3">
        <div>
          <h2 className="eyebrow flex items-center gap-2">
            <span className="text-base leading-none">⏱️</span>
            Vídeos de 7s · só texto · {theme.label}
          </h2>
          <p className="text-sm mt-1 max-w-md" style={{ color: 'var(--text-soft)' }}>
            Sem rosto, sem voz: um texto de abertura, uma virada, e um fundo visual em loop atrás. Formato que
            cresceu +1000% em buscas no TikTok em 2026.
          </p>
        </div>
        <button onClick={generateBatch} className="btn btn-accent focus-ring shrink-0">
          {batch.length === 0 ? `Gerar ${BATCH_SIZE}` : `Gerar outras ${BATCH_SIZE}`}
        </button>
      </div>

      {batch.length > 0 && (
        <ul className="space-y-2 mt-4">
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
                    <span className="eyebrow" style={{ color: 'var(--text-faint)' }}>
                      texto 1
                    </span>{' '}
                    “{c.setup}”
                  </p>
                  <p className="mt-1" style={{ color: 'var(--text)' }}>
                    <span className="eyebrow" style={{ color: 'var(--text-faint)' }}>
                      texto 2
                    </span>{' '}
                    “{c.payoff}”
                  </p>
                  <p className="eyebrow mt-1.5" style={{ color: 'var(--text-faint)' }}>
                    fundo: {c.background} · 7s
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
    </section>
  )
}
