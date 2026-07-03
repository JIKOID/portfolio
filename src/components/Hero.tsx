function Hero() {
  return (
    <section className="hero-section">
      <p className="hero-eyebrow">Hello, I'm</p>
      <h1 className="hero-name">Jaynamm</h1>
      <p className="hero-role">Frontend Developer</p>
      <p className="hero-bio">
        사용자 경험을 고민하는 프론트엔드 개발자입니다. React와 TypeScript를 주로
        사용하며, 새로운 기술을 배우고 적용하는 것을 즐깁니다.
      </p>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}

export default Hero
