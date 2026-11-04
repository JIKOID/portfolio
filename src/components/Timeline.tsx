import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import Markdown from 'markdown-to-jsx'
import { groupByCompany, type CompanyGroup, type CompanyMeta, type TimelineEntry } from '../data/timelineEntry'
import './Timeline.css'

interface TimelineProps {
  title: string
  career: TimelineEntry[]
  companyMetas?: CompanyMeta[]
  graduation: TimelineEntry[]
}

type Stage = {
  key: string
  date: string
  sortKey: number
  title: string
  role: string
  appointment?: string
  period: string
  summary: string
  current: boolean
  kind: 'career' | 'graduation'
}

function entryDate(entry: TimelineEntry) {
  return `${entry.year}.${String(entry.month).padStart(2, '0')}`
}

function companyDate(group: CompanyGroup) {
  return group.period?.match(/\d{4}\.\d{2}/)?.[0] ?? entryDate(group.entries[0])
}

function Timeline({ title, career, companyMetas, graduation }: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const detailRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  const stages = useMemo<Stage[]>(() => [
    ...groupByCompany(career, companyMetas).map((group) => {
      const date = companyDate(group)
      const org = group.entries[0]?.org ?? ''
      return {
        key: `company-${group.company}`,
        date,
        sortKey: Number(date.replace('.', '')),
        title: group.company.replace(/^\(주\)|^주식회사/, ''),
        role: org.replace(`${group.company} · `, '').replace(/\s*\([^)]*\)$/, ''),
        appointment: [group.employment, group.position].filter(Boolean).join(' · '),
        period: [group.period, group.duration].filter(Boolean).join(' · '),
        summary: group.summary || group.entries[0].description,
        current: group.current,
        kind: 'career' as const,
      }
    }),
    ...graduation.map((entry) => ({
      key: `graduation-${entryDate(entry)}`,
      date: entryDate(entry),
      sortKey: entry.year * 100 + entry.month,
      title: entry.title,
      role: entry.org ?? '대학교 졸업',
      period: entryDate(entry),
      summary: entry.description,
      current: false,
      kind: 'graduation' as const,
    })),
  ].sort((a, b) => a.sortKey - b.sortKey), [career, companyMetas, graduation])

  const activeIndex = Math.min(stages.length - 1, Math.floor(progress * stages.length))
  const active = stages[activeIndex]

  useEffect(() => {
    const section = sectionRef.current
    const frame = frameRef.current
    if (!section || !frame) return
    let request = 0
    const update = () => {
      request = 0
      const travel = section.offsetHeight - frame.offsetHeight
      const next = travel > 0 ? -section.getBoundingClientRect().top / travel : 0
      setProgress(Math.max(0, Math.min(1, next)))
    }
    const schedule = () => { if (!request) request = requestAnimationFrame(update) }
    const observer = new ResizeObserver(schedule)
    observer.observe(section)
    observer.observe(frame)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      cancelAnimationFrame(request)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  useEffect(() => {
    const rail = railRef.current
    const track = trackRef.current
    if (!rail || !track || !stages.length) return
    const stageWidth = track.scrollWidth / stages.length
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const position = reducedMotion ? activeIndex : Math.min(progress * stages.length, stages.length - 1)
    const offset = Math.max(0, Math.min(position * stageWidth - rail.clientWidth / 2 + stageWidth / 2, track.scrollWidth - rail.clientWidth))
    track.style.transform = `translateX(${-offset}px)`
  }, [progress, activeIndex, stages.length])

  useEffect(() => { detailRef.current?.scrollTo({ top: 0, behavior: 'instant' }) }, [activeIndex])

  if (!active) return null

  return (
    <section className="pipeline-section" id="journey" ref={sectionRef} style={{ '--stage-count': stages.length } as CSSProperties} aria-labelledby="journey-title" tabIndex={-1}>
      <div className="pipeline-frame" ref={frameRef}>
        <div className="pipeline-inner">
          <header className="pipeline-header">
            <div>
              <p className="section-eyebrow">03 / CAREER JOURNEY</p>
              <h2 id="journey-title">{title}</h2>
            </div>
            <p className="pipeline-guide">아래로 스크롤하면<br />다음 경험으로 이어집니다.</p>
          </header>

          <div className="pipeline-rail" ref={railRef} aria-label="졸업과 회사 이력을 시간 순서로 연결한 커리어">
            <ol className="pipeline-track" ref={trackRef} style={{ '--line-progress': stages.length > 1 ? Math.min(progress * stages.length / (stages.length - 1), 1) : 0 } as CSSProperties}>
              {stages.map((stage, index) => (
                <li className={`pipeline-stage ${index < activeIndex ? 'is-complete' : ''} ${index === activeIndex ? 'is-active' : ''}`} key={stage.key} aria-current={index === activeIndex ? 'step' : undefined}>
                  <div className="pipeline-stage-label">
                    <span className="pipeline-date">{stage.date}</span>
                    <span className="pipeline-node" aria-hidden="true" />
                    <span className="pipeline-stage-title">{stage.title}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <article className="pipeline-detail" ref={detailRef} tabIndex={0} aria-label={`${active.title} 경력 상세`}>
            <div className="pipeline-detail-content" key={active.key}>
              <div className="pipeline-company">
                <p className="pipeline-kind">{active.kind === 'career' ? 'CAREER' : 'GRADUATION'}{active.current && <span>현재</span>}</p>
                <h3>{active.title}</h3>
                <p className="pipeline-role">{active.role}</p>
                {active.appointment && <p className="pipeline-appointment">{active.appointment}</p>}
                <p className="pipeline-period">{active.period}</p>
              </div>
              <div className="pipeline-summary"><Markdown>{active.summary}</Markdown></div>
            </div>
          </article>

          <footer className="pipeline-footer">
            <span className="pipeline-position" aria-live="polite" aria-atomic="true">{String(activeIndex + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}</span>
            <a className="about-next" href="#projects">프로젝트 구성도 보기 <span aria-hidden="true">↓</span></a>
          </footer>
        </div>
      </div>
    </section>
  )
}

export default Timeline
