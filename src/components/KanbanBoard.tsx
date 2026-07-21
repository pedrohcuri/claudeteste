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
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">Seu quadro de conteúdo</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {COLUMNS.map((col, colIndex) => (
          <div key={col.id} className="rounded-xl bg-slate-100 dark:bg-slate-900/50 p-3 min-h-[8rem]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">{col.label}</h3>
              <span className="text-xs text-slate-500">
                {ideas.filter((i) => i.status === col.id).length}
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
                      className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-sm"
                    >
                      <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                        <span>{theme?.emoji}</span>
                        <span>{theme?.label}</span>
                      </div>
                      <p className="text-slate-900 dark:text-slate-100 mb-2">{idea.title}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {colIndex > 0 && (
                            <button
                              onClick={() => onMove(idea.id, COLUMNS[colIndex - 1].id)}
                              className="text-xs px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600"
                            >
                              ←
                            </button>
                          )}
                          {colIndex < COLUMNS.length - 1 && (
                            <button
                              onClick={() => onMove(idea.id, COLUMNS[colIndex + 1].id)}
                              className="text-xs px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600"
                            >
                              →
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => onDelete(idea.id)}
                          className="text-xs text-slate-400 hover:text-red-500"
                        >
                          remover
                        </button>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
