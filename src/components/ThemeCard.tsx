import type { Theme } from '../types'

interface Props {
  theme: Theme
  onPick: (theme: Theme) => void
  active: boolean
}

export function ThemeCard({ theme, onPick, active }: Props) {
  return (
    <button
      onClick={() => onPick(theme)}
      className="focus-ring panel text-left p-4 transition-colors"
      style={{
        borderTop: `3px solid ${theme.color}`,
        background: active ? `color-mix(in srgb, ${theme.color} 10%, var(--paper-raised))` : 'var(--paper-raised)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none">{theme.emoji}</span>
          <span className="font-semibold" style={{ color: 'var(--text)' }}>
            {theme.label}
          </span>
        </div>
        {active && (
          <span
            className="eyebrow shrink-0 ml-2"
            style={{ color: theme.color }}
          >
            ativo
          </span>
        )}
      </div>
      <ul className="text-sm space-y-1.5" style={{ color: 'var(--text-soft)' }}>
        {theme.angles.slice(0, 3).map((angle) => (
          <li key={angle} className="line-clamp-1 pl-3" style={{ borderLeft: '2px solid var(--line)' }}>
            {angle}
          </li>
        ))}
      </ul>
    </button>
  )
}
