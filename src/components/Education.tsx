import Markdown from 'markdown-to-jsx'
import { educationEntries } from '../data/education'
import { etcEntries } from '../data/etc'
import './Education.css'

function Education() {
  const admission = educationEntries.find((entry) => entry.title.includes('입학'))
  const graduation = educationEntries.find((entry) => entry.title.includes('졸업'))
  const academic = graduation ? {
    ...graduation,
    title: graduation.title.replace(/ 졸업$/, ''),
    period: `${admission?.year ?? graduation.year}.${String(admission?.month ?? graduation.month).padStart(2, '0')} – ${graduation.year}.${String(graduation.month).padStart(2, '0')}`,
    org: `${graduation.org ?? '학사'} · 졸업`,
  } : undefined
  const entries = [...(academic ? [academic] : []), ...etcEntries.toSorted((a, b) => b.year - a.year || b.month - a.month)]

  return (
    <section className="education-section" id="education" aria-labelledby="education-title">
      <div className="education-inner">
        <header className="education-heading">
          <p className="section-eyebrow">EDUCATION & CERTIFICATIONS</p>
          <h2 id="education-title">학력·교육·자격</h2>
          <p>전공, 교육 과정, 스터디와 자격 이력을 정리했습니다.</p>
        </header>
        <ol className="education-list">
          {entries.map((entry) => (
            <li key={`${entry.year}-${entry.month}-${entry.title}`}>
              <div className="education-meta">
                <p className="education-period">{entry.period ?? `${entry.year}.${String(entry.month).padStart(2, '0')}`}</p>
                <h3>{entry.title}</h3>
                {entry.org && <p className="education-org">{entry.org}</p>}
              </div>
              <div className="timeline-description"><Markdown>{entry.description}</Markdown></div>
            </li>
          ))}
        </ol>
        <footer className="education-footer"><a href="#about">프로필과 연락처로 돌아가기 <span aria-hidden="true">↑</span></a></footer>
      </div>
    </section>
  )
}

export default Education
