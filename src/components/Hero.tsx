import { about } from '../data/about'
import EngineerDrawing from './EngineerDrawing'

function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden="true">Data Engineer</div>

      <div className="hero-content">
        <div className="hero-intro">
          <h1 className="hero-title" id="hero-title">
            <span className="hero-greeting">안녕하세요.</span>
            <span>데이터 엔지니어</span>
            <span><strong className="hero-name">{about.name}</strong>입니다.</span>
          </h1>
          <p className="hero-caption">어제보다 더 나은 오늘을 만들어갑니다.</p>
        </div>

        <div className="hero-artwork">
          <EngineerDrawing />
          <span className="hero-artwork-caption" aria-hidden="true">a little curiosity, every day.</span>
        </div>
      </div>

      <div className="hero-bottomline">
        <span className="hero-index" aria-hidden="true">01 <span>/</span> INTRODUCTION</span>
        <a className="hero-scroll-cue" href="#about" aria-label="아래로 스크롤하여 자기소개 보기">
          <span className="hero-scroll-mouse" aria-hidden="true"><span /></span>
          <span>아래로 스크롤해 주세요</span>
          <svg className="hero-scroll-arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 3v13m-5-5 5 5 5-5" />
          </svg>
        </a>
        <span className="hero-bottom-note" aria-hidden="true">데이터로 이어지는 이야기</span>
      </div>
    </section>
  )
}

export default Hero
