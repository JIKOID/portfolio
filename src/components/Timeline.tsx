import Markdown from 'markdown-to-jsx'
import { groupByCompany, sortTimelineEntries, type TimelineEntry } from '../data/timelineEntry'

interface TimelineProps {
  title: string
  entries: TimelineEntry[]
  groupByCompany?: boolean
}

function roleOnly(org: string, company: string): string {
  const prefix = `${company} · `
  return org.startsWith(prefix) ? org.slice(prefix.length) : org
}

function TimelineItem({ entry, company }: { entry: TimelineEntry; company?: string }) {
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
        <div className="timeline-description">
          <Markdown>{entry.description}</Markdown>
        </div>
        {entry.current && <span className="timeline-badge">현재</span>}
      </div>
    </li>
  )
}

function Timeline({ title, entries, groupByCompany: shouldGroupByCompany }: TimelineProps) {
  return (
    <section className="timeline-section">
      <h2 className="timeline-heading">{title}</h2>
      {shouldGroupByCompany ? (
        <div className="company-groups">
          {groupByCompany(entries).map((group) => (
            <div className="company-group" key={group.company}>
              <div className="company-group-heading">
                <h3>{group.company}</h3>
                {group.current && <span className="timeline-badge">현재</span>}
              </div>
              <ol className="timeline">
                {group.entries.map((entry) => (
                  <TimelineItem
                    entry={entry}
                    company={group.company}
                    key={`${entry.year}-${entry.month}-${entry.title}`}
                  />
                ))}
              </ol>
            </div>
          ))}
        </div>
      ) : (
        <ol className="timeline">
          {sortTimelineEntries(entries).map((entry) => (
            <TimelineItem entry={entry} key={`${entry.year}-${entry.month}-${entry.title}`} />
          ))}
        </ol>
      )}
    </section>
  )
}

export default Timeline
