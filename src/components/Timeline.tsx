import Markdown from 'markdown-to-jsx'
import { sortTimelineEntries, type TimelineEntry } from '../data/timelineEntry'

interface TimelineProps {
  title: string
  entries: TimelineEntry[]
}

function Timeline({ title, entries }: TimelineProps) {
  const sortedEntries = sortTimelineEntries(entries)

  return (
    <section className="timeline-section">
      <h2 className="timeline-heading">{title}</h2>
      <ol className="timeline">
        {sortedEntries.map((entry) => (
          <li className="timeline-item" key={`${entry.year}-${entry.month}-${entry.title}`}>
            <div className="timeline-date">
              <span className="timeline-year">{entry.year}</span>
              <span className="timeline-month">
                {String(entry.month).padStart(2, '0')}
              </span>
            </div>
            <div className="timeline-marker">
              <span className="timeline-dot" />
            </div>
            <div className="timeline-content">
              <h3>{entry.title}</h3>
              <div className="timeline-description">
                <Markdown>{entry.description}</Markdown>
              </div>
              {entry.current && <span className="timeline-badge">현재</span>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Timeline
