import { Fragment, useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import {
  groupByCompany,
  sortTimelineEntries,
  type CompanyMeta,
  type TimelineEntry,
} from '../data/timelineEntry'

interface TimelineProps {
  title: string
  entries: TimelineEntry[]
  groupByCompany?: boolean
  companyMetas?: CompanyMeta[]
  detailInModal?: boolean
}

function roleOnly(org: string, company: string): string {
  const prefix = `${company} · `
  return org.startsWith(prefix) ? org.slice(prefix.length) : org
}

function entryDateLabel(entry: TimelineEntry): string {
  return entry.period ?? `${entry.year}.${String(entry.month).padStart(2, '0')}`
}

interface TimelineItemProps {
  entry: TimelineEntry
  company?: string
  onSelect?: (entry: TimelineEntry) => void
}

// onSelect가 있으면 제목만 보여주는 컴팩트 모드로 렌더링하고,
// 상세 내용은 "자세히 보기" 버튼을 통해 모달로 보여줍니다.
function TimelineItem({ entry, company, onSelect }: TimelineItemProps) {
  const orgLabel = entry.org && company ? roleOnly(entry.org, company) : entry.org

  return (
    <li className="timeline-item">
      <div className="timeline-date">
        {entry.period ? (
          <span className="timeline-period">{entry.period}</span>
        ) : (
          <>
            <span className="timeline-year">{entry.year}</span>
            <span className="timeline-month">{String(entry.month).padStart(2, '0')}</span>
          </>
        )}
      </div>
      <div className="timeline-marker">
        <span className="timeline-dot" />
      </div>
      <div className="timeline-content">
        <h3>{entry.title}</h3>
        {orgLabel && <p className="timeline-org">{orgLabel}</p>}
        {onSelect ? (
          entry.description && (
            <button
              type="button"
              className="timeline-detail-button"
              onClick={() => onSelect(entry)}
            >
              자세히 보기
            </button>
          )
        ) : (
          <>
            <div className="timeline-description">
              <Markdown>{entry.description}</Markdown>
            </div>
            {entry.current && <span className="timeline-badge">현재</span>}
          </>
        )}
      </div>
    </li>
  )
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

function Timeline({
  title,
  entries,
  groupByCompany: shouldGroupByCompany,
  companyMetas,
  detailInModal,
}: TimelineProps) {
  const [selected, setSelected] = useState<TimelineEntry | null>(null)

  return (
    <section className="timeline-section">
      <h2 className="timeline-heading">{title}</h2>
      {shouldGroupByCompany ? (
        <ol className="timeline timeline--grouped">
          {groupByCompany(entries, companyMetas).map((group) => (
            <Fragment key={group.company}>
              <li className="timeline-item timeline-company">
                <div className="timeline-date">
                  {group.period && <span className="timeline-period">{group.period}</span>}
                  {group.duration && (
                    <span className="timeline-duration">{group.duration}</span>
                  )}
                </div>
                <div className="timeline-marker">
                  <span className="timeline-dot timeline-company-dot" />
                </div>
                <div className="timeline-content">
                  <div className="timeline-company-row">
                    <h3 className="timeline-company-name">{group.company}</h3>
                    {group.current && <span className="timeline-badge">현재</span>}
                  </div>
                </div>
              </li>
              {group.entries.map((entry) => (
                <TimelineItem
                  entry={entry}
                  company={group.company}
                  onSelect={setSelected}
                  key={`${entry.year}-${entry.month}-${entry.title}`}
                />
              ))}
            </Fragment>
          ))}
        </ol>
      ) : (
        <ol className="timeline">
          {sortTimelineEntries(entries).map((entry) => (
            <TimelineItem
              entry={entry}
              onSelect={detailInModal ? setSelected : undefined}
              key={`${entry.year}-${entry.month}-${entry.title}`}
            />
          ))}
        </ol>
      )}
      {selected && <DetailModal entry={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

export default Timeline
