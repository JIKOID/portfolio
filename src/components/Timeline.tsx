import { timelineEntries } from '../data/timeline'

function Timeline() {
  const sortedEntries = [...timelineEntries].sort(
    (a, b) => a.year - b.year || a.month - b.month,
  )

  return (
    <section className="timeline-section">
      <h2 className="timeline-heading">Career</h2>
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
              <p>{entry.description}</p>
              {entry.current && <span className="timeline-badge">현재</span>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Timeline
