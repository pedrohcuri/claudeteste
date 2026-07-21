import type { Idea, IdeaStatus, Theme } from '../types'

const COLUMNS: { id: IdeaStatus; label: string }[] = [
  { id: 'ideia', label: 'Ideia' },
  { id: 'roteiro', label: 'Roteiro' },
  { id: 'gravado', label: 'Gravado' },
  { id: 'postado', label: 'Postado' },
]

interface Props {
  ideas: Idea[]
  themesById: Record<string, Theme>
  onMove: (id: string, status: IdeaStatus) => void
  onDelete: (id: string) => void
}

export function KanbanBoard({ ideas, themesById, onMove, onDelete }: Props) {
  return (
    <section>
      <h2 className="eyebrow mb-3">Seu quadro de conteúdo</h2>
      <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: 'var(--line)' }}>
        {COLUMNS.map((col, colIndex) => (
          <div key={col.id} className="p-3 min-h-32" style={{ background: 'var(--paper)' }}>
            <div
              className="flex items-center justify-between mb-3 pb-2"
              style={{ borderBottom: '1px solid var(--line)' }}
            >
              <h3 className="eyebrow" style={{ color: 'var(--text-soft)' }}>
                {col.label}
              </h3>
              <span className="timecode text-xs" style={{ color: 'var(--text-faint)' }}>
                {String(ideas.filter((i) => i.status === col.id).length).padStart(2, '0')}
              </span>
            </div>
            <div className="space-y-2">
              {ideas
                .filter((idea) => idea.status === col.id)
                .map((idea) => {
                  const theme = themesById[idea.themeId]
                  return (
                    <div
                      key={idea.id}
                      className="p-3 text-sm"
                      style={{
                        background: 'var(--paper-raised)',
                        border: '1px solid var(--line)',
                        borderLeft: `3px solid ${theme?.color ?? 'var(--line)'}`,
                        borderRadius: '2px',
                      }}
                    >
                      <div className="eyebrow flex items-center gap-1 mb-1.5" style={{ color: 'var(--text-faint)' }}>
                        <span>{theme?.emoji}</span>
                        <span>{theme?.label}</span>
                      </div>
                      <p className="mb-2" style={{ color: 'var(--text)' }}>
                        {idea.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {colIndex > 0 && (
                            <button
                              onClick={() => onMove(idea.id, COLUMNS[colIndex - 1].id)}
                              className="btn btn-outline focus-ring"
                              style={{ padding: '0.15rem 0.5rem' }}
                              aria-label={`Mover para ${COLUMNS[colIndex - 1].label}`}
                            >
                              ←
                            </button>
                          )}
                          {colIndex < COLUMNS.length - 1 && (
                            <button
                              onClick={() => onMove(idea.id, COLUMNS[colIndex + 1].id)}
                              className="btn btn-outline focus-ring"
                              style={{ padding: '0.15rem 0.5rem' }}
                              aria-label={`Mover para ${COLUMNS[colIndex + 1].label}`}
                            >
                              →
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => onDelete(idea.id)}
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
                })}
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
