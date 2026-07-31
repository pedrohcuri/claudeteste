import { useState } from 'react'
import type { MoneyTalkIdea, TipList } from '../types'
import { TIP_LISTS } from '../data/moneyTalksLists'

interface Props {
  onAdd: (idea: MoneyTalkIdea) => void
}

function listToCard(list: TipList) {
  const script = [
    `GANCHO: ${list.hook}`,
    ...list.tips.map((tip, i) => `${i + 1}. ${tip}`),
    `FECHO: ${list.closing}`,
    '',
    '— LEGENDA —',
    list.caption,
  ].join('\n')
  return script
}

export function TipListPanel({ onAdd }: Props) {
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())

  function addList(list: TipList) {
    onAdd({
      id: crypto.randomUUID(),
      pillar: list.pillar,
      phrase: list.title,
      caption: listToCard(list),
      status: 'ideia',
      createdAt: new Date().toISOString(),
    })
    setAddedIds((prev) => new Set(prev).add(list.id))
  }

  return (
    <section className="panel p-4">
      <h3 className="eyebrow mb-1">Listas de dicas prontas</h3>
      <p className="text-sm mb-3" style={{ color: 'var(--text-soft)' }}>
        Roteiros curados (gancho + dicas numeradas + legenda) — cresce conforme a gente for pensando em novas.
      </p>
      <ul className="space-y-2">
        {TIP_LISTS.map((list) => {
          const added = addedIds.has(list.id)
          return (
            <li key={list.id} className="p-3" style={{ border: '1px solid var(--line)', borderRadius: '3px' }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                    {list.title}
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-soft)' }}>
                    “{list.hook}”
                  </p>
                </div>
                <button
                  onClick={() => addList(list)}
                  disabled={added}
                  className="btn btn-outline focus-ring shrink-0"
                >
                  {added ? 'Adicionada ✓' : 'Adicionar'}
                </button>
              </div>
              <ol
                className="text-sm mt-2 space-y-1 pl-4"
                style={{ color: 'var(--text-soft)', borderLeft: '2px solid var(--line)' }}
              >
                {list.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ol>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
