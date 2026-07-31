import { useRef, useState } from 'react'
import type { MoneyTalkIdea } from '../types'
import { MONEY_TALK_BANK, MONEY_TALK_PILLARS } from '../data/moneyTalks'

interface Props {
  onAdd: (idea: MoneyTalkIdea) => void
}

const BATCH_SIZE = 5

function shuffle<T>(list: T[]): T[] {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function MoneyTalksGenerator({ onAdd }: Props) {
  const pillarId = MONEY_TALK_PILLARS[0].id
  const [batch, setBatch] = useState<number[]>([])
  const [addedIdx, setAddedIdx] = useState<Set<number>>(new Set())
  const usedByPillar = useRef<Record<string, Set<number>>>({})

  const pool = MONEY_TALK_BANK[pillarId]
  const pillar = MONEY_TALK_PILLARS.find((p) => p.id === pillarId)!

  function generateBatch() {
    const used = usedByPillar.current[pillarId] ?? new Set<number>()
    let availableIdx = pool.map((_, i) => i).filter((i) => !used.has(i))
    if (availableIdx.length < Math.min(BATCH_SIZE, pool.length)) {
      used.clear()
      availableIdx = pool.map((_, i) => i)
    }
    const picked = shuffle(availableIdx).slice(0, BATCH_SIZE)
    picked.forEach((i) => used.add(i))
    usedByPillar.current[pillarId] = used
    setBatch(picked)
    setAddedIdx(new Set())
  }

  function addItem(i: number) {
    const item = pool[i]
    onAdd({
      id: crypto.randomUUID(),
      pillar: pillarId,
      phrase: item.phrase,
      caption: item.caption,
      status: 'ideia',
      createdAt: new Date().toISOString(),
    })
    setAddedIdx((prev) => new Set(prev).add(i))
  }

  return (
    <section className="panel p-4">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="eyebrow flex items-center gap-2">
            <span className="text-base leading-none">{pillar.emoji}</span>
            {pillar.label} · tom de humor
          </h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-soft)' }}>
            Frase de impacto pra tela + legenda pronta pra contextualizar. Mais pilares (carreira, IA,
            investimento) entram depois.
          </p>
        </div>
        <button onClick={generateBatch} className="btn btn-accent focus-ring shrink-0">
          {batch.length === 0 ? `Gerar ${BATCH_SIZE}` : `Gerar outras ${BATCH_SIZE}`}
        </button>
      </div>

      {batch.length > 0 && (
        <ul className="space-y-2">
          {batch.map((i) => {
            const item = pool[i]
            const added = addedIdx.has(i)
            return (
              <li key={i} className="p-3" style={{ border: '1px solid var(--line)', borderRadius: '3px' }}>
                <p className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text)' }}>
                  “{item.phrase}”
                </p>
                <p
                  className="text-sm whitespace-pre-line mb-2"
                  style={{ color: 'var(--text-soft)', borderLeft: '2px solid var(--line)', paddingLeft: '0.6rem' }}
                >
                  {item.caption}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => addItem(i)}
                    disabled={added}
                    className="btn btn-outline focus-ring"
                  >
                    {added ? 'Adicionada ✓' : 'Adicionar'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
