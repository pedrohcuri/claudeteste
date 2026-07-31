import { useState } from 'react'
import type { IdeaStatus, MoneyTalkIdea } from '../types'
import { MONEY_TALK_PILLARS } from '../data/moneyTalks'

const COLUMNS: { id: IdeaStatus; label: string }[] = [
  { id: 'ideia', label: 'Ideia' },
  { id: 'roteiro', label: 'Roteiro' },
  { id: 'gravado', label: 'Gravado' },
  { id: 'postado', label: 'Postado' },
]

interface BoardProps {
  ideas: MoneyTalkIdea[]
  onMove: (id: string, status: IdeaStatus) => void
  onDelete: (id: string) => void
}

export function MoneyTalksBoard({ ideas, onMove, onDelete }: BoardProps) {
  return (
    <section>
      <h3 className="eyebrow mb-3">Quadro do Money Talks</h3>
      <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: 'var(--line)' }}>
        {COLUMNS.map((col, colIndex) => (
          <div key={col.id} className="p-3 min-h-32" style={{ background: 'var(--paper)' }}>
            <div
              className="flex items-center justify-between mb-3 pb-2"
              style={{ borderBottom: '1px solid var(--line)' }}
            >
              <h4 className="eyebrow" style={{ color: 'var(--text-soft)' }}>
                {col.label}
              </h4>
              <span className="timecode text-xs" style={{ color: 'var(--text-faint)' }}>
                {String(ideas.filter((i) => i.status === col.id).length).padStart(2, '0')}
              </span>
            </div>
            <div className="space-y-2">
              {ideas
                .filter((idea) => idea.status === col.id)
                .map((idea) => (
                  <MoneyTalkCard
                    key={idea.id}
                    idea={idea}
                    canMoveLeft={colIndex > 0}
                    canMoveRight={colIndex < COLUMNS.length - 1}
                    onMoveLeft={() => onMove(idea.id, COLUMNS[colIndex - 1].id)}
                    onMoveRight={() => onMove(idea.id, COLUMNS[colIndex + 1].id)}
                    onDelete={() => onDelete(idea.id)}
                  />
                ))}
              {ideas.filter((i) => i.status === col.id).length === 0 && (
                <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
                  —
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

interface CardProps {
  idea: MoneyTalkIdea
  canMoveLeft: boolean
  canMoveRight: boolean
  onMoveLeft: () => void
  onMoveRight: () => void
  onDelete: () => void
}

function MoneyTalkCard({ idea, canMoveLeft, canMoveRight, onMoveLeft, onMoveRight, onDelete }: CardProps) {
  const [open, setOpen] = useState(false)
  const pillar = MONEY_TALK_PILLARS.find((p) => p.id === idea.pillar)

  return (
    <div
      className="p-3 text-sm"
      style={{
        background: 'var(--paper-raised)',
        border: '1px solid var(--line)',
        borderLeft: '3px solid var(--accent)',
        borderRadius: '2px',
      }}
    >
      <div className="eyebrow mb-1.5" style={{ color: 'var(--text-faint)' }}>
        {pillar?.emoji} {pillar?.label}
      </div>
      <p className="mb-1 font-semibold" style={{ color: 'var(--text)' }}>
        “{idea.phrase}”
      </p>
      <button onClick={() => setOpen((v) => !v)} className="eyebrow mb-2" style={{ color: 'var(--accent-strong)' }}>
        {open ? 'ocultar roteiro/legenda' : 'ver roteiro/legenda'}
      </button>
      {open && (
        <p
          className="text-sm whitespace-pre-line mb-2 p-2"
          style={{ color: 'var(--text-soft)', background: 'var(--paper)', borderRadius: '2px' }}
        >
          {idea.caption}
        </p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {canMoveLeft && (
            <button
              onClick={onMoveLeft}
              className="btn btn-outline focus-ring"
              style={{ padding: '0.15rem 0.5rem' }}
              aria-label="Mover pra trás"
            >
              ←
            </button>
          )}
          {canMoveRight && (
            <button
              onClick={onMoveRight}
              className="btn btn-outline focus-ring"
              style={{ padding: '0.15rem 0.5rem' }}
              aria-label="Mover pra frente"
            >
              →
            </button>
          )}
        </div>
        <button
          onClick={onDelete}
          className="eyebrow focus-ring"
          style={{ color: 'var(--text-faint)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--rec)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-faint)')}
        >
          remover
        </button>
      </div>
    </div>
  )
}
