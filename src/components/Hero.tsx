import Markdown from 'markdown-to-jsx'
import { about } from '../data/about'

function Hero() {
  return (
    <section className="hero-section">
      <p className="hero-eyebrow">{about.eyebrow}</p>
      <h1 className="hero-name">{about.name}</h1>
      <p className="hero-role">{about.role}</p>
      <div className="hero-bio">
        <Markdown>{about.bio}</Markdown>
      </div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}

export default Hero
