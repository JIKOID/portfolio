import Markdown from 'markdown-to-jsx'
import { about } from '../data/about'

function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title" tabIndex={-1}>
      <div className="about-inner">
        <div className="about-profile">
          <div className="about-heading">
            <p className="about-eyebrow">자기소개</p>
            <h2 id="about-title">운영을 이해하고,<br />데이터의 활용까지<br />연결합니다.</h2>
            <p className="about-name">{about.name}<span>{about.role}</span></p>
            {about.email && <a className="about-email" href={`mailto:${about.email}`}>{about.email}<span aria-hidden="true">↗</span></a>}
          </div>
          <div className="about-bio"><Markdown>{about.bio}</Markdown></div>
        </div>

        <div className="about-skills" aria-label="주요 기술">
          {about.skills.map((group) => (
            <section key={group.label}>
              <h3>{group.label}</h3>
              <ul>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </section>
          ))}
        </div>

        {about.links.length > 0 && (
          <nav className="about-connect" aria-labelledby="about-links-title">
            <h3 id="about-links-title">더 알아보기</h3>
            <div className="about-links">
              {about.links.map((link) => (
                <a
                  className="about-link"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} — ${link.description} (새 탭에서 열림)`}
                  key={link.url}
                >
                  <span className="about-link-top" aria-hidden="true">
                    <span className="about-link-mark">{link.mark}</span>
                    <svg className="about-link-arrow" viewBox="0 0 24 24" fill="none">
                      <path d="M6 18 18 6M6 6h12v12" />
                    </svg>
                  </span>
                  <span className="about-link-label">{link.label}</span>
                  <span className="about-link-description">{link.description}</span>
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>

      <div className="about-footer">
        <span className="about-page-index" aria-hidden="true">02 / ABOUT ME</span>
        <a className="about-next" href="#journey">
          경력과 프로젝트 보기 <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}

export default About
