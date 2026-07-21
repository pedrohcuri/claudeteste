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
      className={`text-left rounded-xl border p-4 transition shadow-sm hover:shadow-md ${
        active ? 'border-transparent ring-2 ring-offset-2' : 'border-slate-200 dark:border-slate-700'
      }`}
      style={active ? { boxShadow: `0 0 0 2px ${theme.color}` } : undefined}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{theme.emoji}</span>
        <span className="font-semibold text-slate-900 dark:text-slate-100">{theme.label}</span>
      </div>
      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
        {theme.angles.slice(0, 3).map((angle) => (
          <li key={angle} className="line-clamp-1">
            • {angle}
          </li>
        ))}
      </ul>
    </button>
  )
}
