import { REFERENCES } from '../data/references'

export function ReferencePanel() {
  return (
    <section>
      <h2 className="eyebrow mb-1">Referências pra se inspirar</h2>
      <p className="text-sm mb-3" style={{ color: 'var(--text-soft)' }}>
        Não são do seu nicho — o que importa aqui é a técnica, não o assunto.
      </p>
      <div className="grid gap-px sm:grid-cols-2" style={{ background: 'var(--line)' }}>
        {REFERENCES.map((ref) => (
          <div key={ref.name} className="p-4" style={{ background: 'var(--paper-raised)' }}>
            <h3 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
              {ref.name}
            </h3>
            <p className="eyebrow mb-2" style={{ color: 'var(--text-faint)' }}>
              {ref.knownFor}
            </p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--text-soft)' }}>
              {ref.technique}
            </p>
            <p
              className="text-sm leading-relaxed pl-3"
              style={{ color: 'var(--text)', borderLeft: '2px solid var(--accent)' }}
            >
              {ref.howToApply}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
