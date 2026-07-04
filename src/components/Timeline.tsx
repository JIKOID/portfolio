import { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import {
  groupByCompany,
  type CompanyGroup,
  type CompanyMeta,
  type TimelineEntry,
} from '../data/timelineEntry'

interface TimelineProps {
  title: string
  career: TimelineEntry[]
  companyMetas?: CompanyMeta[]
  side: TimelineEntry[]
}

function roleOnly(org: string, company: string): string {
  const prefix = `${company} · `
  return org.startsWith(prefix) ? org.slice(prefix.length) : org
}

function entryDateLabel(entry: TimelineEntry): string {
  return entry.period ?? `${entry.year}.${String(entry.month).padStart(2, '0')}`
}

// 회사(업무 경력)는 오른쪽, 학력·자격증 등(side)은 왼쪽에 배치해
// 하나의 중앙선 위에서 전체 흐름을 시간 내림차순으로 보여줍니다.
type FlowItem =
  | { kind: 'company'; group: CompanyGroup; key: string; sortKey: number }
  | { kind: 'side'; entry: TimelineEntry; key: string; sortKey: number }

function companyStartKey(group: CompanyGroup): number {
  const match = group.period?.match(/(\d{4})\.(\d{1,2})/)
  if (match) return Number(match[1]) * 12 + Number(match[2])
  const first = group.entries[0]
  return first ? first.year * 12 + first.month : 0
}

function DetailModal({ entry, onClose }: { entry: TimelineEntry; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={entry.title}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="닫기">
          ×
        </button>
        <p className="modal-period">{entryDateLabel(entry)}</p>
        <h3 className="modal-title">{entry.title}</h3>
        {entry.org && <p className="modal-org">{entry.org}</p>}
        <div className="timeline-description modal-body">
          <Markdown>{entry.description}</Markdown>
        </div>
      </div>
    </div>
  )
}

function Timeline({ title, career, companyMetas, side }: TimelineProps) {
  const [selected, setSelected] = useState<TimelineEntry | null>(null)

  const items: FlowItem[] = [
    ...groupByCompany(career, companyMetas).map((group) => ({
      kind: 'company' as const,
      group,
      key: `company-${group.company}`,
      sortKey: companyStartKey(group),
    })),
    ...side.map((entry) => ({
      kind: 'side' as const,
      entry,
      key: `side-${entry.year}-${entry.month}-${entry.title}`,
      sortKey: entry.year * 12 + entry.month,
    })),
  ].sort((a, b) => b.sortKey - a.sortKey)

  return (
    <section className="timeline-section">
      <h2 className="timeline-heading">{title}</h2>
      <ol className="flow-timeline">
        {items.map((item) => {
          const firstOrg = item.kind === 'company' ? item.group.entries[0]?.org : undefined
          const role =
            item.kind === 'company' && firstOrg
              ? roleOnly(firstOrg, item.group.company)
              : undefined

          return (
            <li className="flow-item" key={item.key}>
              <div className="flow-side flow-side--left">
                {item.kind === 'side' && (
                  <>
                    <span className="flow-date">{entryDateLabel(item.entry)}</span>
                    <h3 className="flow-side-title">{item.entry.title}</h3>
                    {item.entry.org && <p className="flow-side-org">{item.entry.org}</p>}
                    {item.entry.description && (
                      <button
                        type="button"
                        className="timeline-detail-button"
                        onClick={() => setSelected(item.entry)}
                      >
                        자세히 보기
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className="timeline-marker">
                <span
                  className={
                    item.kind === 'company'
                      ? 'timeline-dot timeline-company-dot'
                      : 'timeline-dot'
                  }
                />
              </div>
              <div className="flow-side flow-side--right">
                {item.kind === 'company' && (
                  <>
                    <span className="flow-date">
                      {item.group.period}
                      {item.group.duration && ` · ${item.group.duration}`}
                    </span>
                    <div className="timeline-company-row">
                      <h3 className="timeline-company-name">{item.group.company}</h3>
                      {role && <span className="timeline-company-role">{role}</span>}
                      {item.group.current && <span className="timeline-badge">현재</span>}
                    </div>
                    <ul className="project-row">
                      {item.group.entries.map((entry) => (
                        <li key={`${entry.year}-${entry.month}-${entry.title}`}>
                          <button
                            type="button"
                            className="project-chip"
                            onClick={() => setSelected(entry)}
                          >
                            <span className="project-chip-date">{entryDateLabel(entry)}</span>
                            <span className="project-chip-title">{entry.title}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ol>
      {selected && <DetailModal entry={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

export default Timeline
