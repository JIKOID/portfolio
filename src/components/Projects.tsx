import { useMemo, useRef, useState, type CSSProperties } from 'react'
import Markdown from 'markdown-to-jsx'
import { careerEntries, companyMetas } from '../data/career'
import { groupByCompany, type CompanyGroup } from '../data/timelineEntry'
import { projectBlueprints } from '../data/projectBlueprints'
import './Projects.css'

function ProjectChapter({ group, index, nextId }: { group: CompanyGroup; index: number; nextId?: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const storyRef = useRef<HTMLDivElement>(null)
  const entry = group.entries[selectedIndex]
  const blueprint = projectBlueprints[entry.title]
  const id = `project-chapter-${index}`
  const [intro, ...body] = entry.description.split('\n\n')

  return (
    <section className="project-chapter" id={id} aria-labelledby={`${id}-title`}>
      <div className="project-chapter-inner">
        <header className="project-chapter-header">
          <div>
            <p className="section-eyebrow">{String(index + 4).padStart(2, '0')} / DATA ENGINEERING PROJECTS</p>
            <h2 id={`${id}-title`}>{group.company.replace(/^\(주\)|^주식회사/, '')}</h2>
          </div>
          <p className="project-company-period">{group.period}<span>{group.entries.length}개의 프로젝트·운영 업무</span></p>
        </header>

        <div className="project-browser">
          <nav className="project-selector" aria-label={`${group.company} 프로젝트 선택`}>
            <p className="project-selector-label">담당 업무 <span>{group.entries.length}</span></p>
            {group.entries.map((project, projectIndex) => (
              <button
                type="button"
                key={project.title}
                className={projectIndex === selectedIndex ? 'is-selected' : ''}
                aria-pressed={projectIndex === selectedIndex}
                aria-controls={`${id}-content`}
                onClick={() => {
                  setSelectedIndex(projectIndex)
                  requestAnimationFrame(() => {
                    const story = storyRef.current
                    if (!story) return
                    const isMobile = window.matchMedia('(max-width: 760px)').matches
                    if (isMobile || story.getBoundingClientRect().top < 24) {
                      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                      if (isMobile) story.focus({ preventScroll: true })
                      story.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })
                    }
                  })
                }}
              >
                <span className="project-selector-number">{String(projectIndex + 1).padStart(2, '0')}</span>
                <span className="project-selector-title">{project.title}</span>
              </button>
            ))}
          </nav>

          <div className="project-story" id={`${id}-content`} key={entry.title} ref={storyRef} tabIndex={-1} aria-labelledby={`${id}-project-title`}>
            <div className="project-story-heading">
              <div>
                <p className="project-period">{entry.period}</p>
                <h3 id={`${id}-project-title`}>{entry.title}</h3>
                <div className="project-intro"><Markdown>{intro}</Markdown></div>
              </div>
              {blueprint && (
                <div className="project-result">
                  <span>{blueprint.outcomeHeading ?? '주요 결과'}</span>
                  <strong>{blueprint.outcome}</strong>
                  <p>{blueprint.outcomeLabel}</p>
                </div>
              )}
            </div>

            {blueprint && (
              <figure className="architecture">
                <figcaption><span aria-hidden="true">↳</span>{blueprint.diagramTitle}</figcaption>
                {blueprint.orchestration && <div className="architecture-orchestration">{blueprint.orchestration}</div>}
                <ol
                  className={`architecture-flow ${blueprint.parallel ? 'architecture-flow--parallel' : ''}`}
                  style={{ '--node-count': blueprint.nodes.length } as CSSProperties}
                  aria-label={blueprint.parallel ? '주요 구성 요소' : '데이터 또는 작업 흐름 순서'}
                >
                  {blueprint.nodes.map((node, nodeIndex) => (
                    <li key={node.title}>
                      <span className="architecture-node-index">{blueprint.parallel ? 'COMPONENT' : `STEP ${String(nodeIndex + 1).padStart(2, '0')}`}</span>
                      <strong>{node.title}</strong>
                      <span className="architecture-node-detail">{node.detail}</span>
                    </li>
                  ))}
                </ol>
                {blueprint.returnPath && <p className="architecture-return">↳ {blueprint.returnPath}</p>}
              </figure>
            )}

            {body.length > 0 && (
              <section className="project-details" aria-label="담당 업무와 구현 내용">
                {!body.join('\n\n').trimStart().startsWith('#') && <h4>담당 업무와 구현 내용</h4>}
                <div className="timeline-description"><Markdown>{body.join('\n\n')}</Markdown></div>
              </section>
            )}
          </div>
        </div>

        <footer className="project-chapter-footer">
          <a href="#journey">↑ 커리어 파이프라인</a>
          <a href={nextId ? `#${nextId}` : '#education'}>{nextId ? '다음 프로젝트 모음' : '학력·교육·자격 보기'} <span aria-hidden="true">↓</span></a>
        </footer>
      </div>
    </section>
  )
}

function Projects() {
  const groups = useMemo(() => groupByCompany(
    careerEntries.filter((entry) => entry.org?.includes('데이터 엔지니어')),
    companyMetas,
  ).reverse(), [])

  return (
    <div className="projects-section" id="projects">
      {groups.map((group, index) => (
        <ProjectChapter group={group} index={index} nextId={index < groups.length - 1 ? `project-chapter-${index + 1}` : undefined} key={group.company} />
      ))}
    </div>
  )
}

export default Projects
