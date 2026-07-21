import trendsData from '../data/trends.json'
import type { Trend } from '../types'

const trends = trendsData.trends as Trend[]

const platformDot: Record<Trend['platform'], string> = {
  Instagram: '#c23b6b',
  TikTok: 'var(--text)',
  Ambos: 'var(--accent)',
}

export function TrendsPanel() {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="eyebrow">Tendências</h2>
        <span className="eyebrow timecode">
          atualizado {trendsData.fetchedAt} · peça pro Claude buscar de novo
        </span>
      </div>
      <div className="grid gap-px sm:grid-cols-2" style={{ background: 'var(--line)' }}>
        {trends.map((trend) => (
          <div key={trend.id} className="p-4" style={{ background: 'var(--paper-raised)' }}>
            <div className="flex items-center justify-between mb-1.5 gap-2">
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                {trend.title}
              </h3>
              <span
                className="eyebrow shrink-0 flex items-center gap-1.5"
                style={{ color: 'var(--text-faint)' }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: platformDot[trend.platform] }}
                />
                {trend.platform}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
              {trend.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export { trends }
