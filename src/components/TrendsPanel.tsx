import trendsData from '../data/trends.json'
import type { Trend } from '../types'

const trends = trendsData.trends as Trend[]

const platformStyle: Record<Trend['platform'], string> = {
  Instagram: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  TikTok: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
  Ambos: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
}

export function TrendsPanel() {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Tendências</h2>
        <span className="text-xs text-slate-500">
          atualizado em {trendsData.fetchedAt} · peça pro Claude buscar de novo quando quiser
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {trends.map((trend) => (
          <div
            key={trend.id}
            className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-slate-900 dark:text-slate-100">{trend.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ml-2 ${platformStyle[trend.platform]}`}>
                {trend.platform}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{trend.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export { trends }
