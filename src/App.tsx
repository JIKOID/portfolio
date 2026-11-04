import { useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import Education from './components/Education'
import { careerEntries, companyMetas } from './data/career'
import { educationEntries } from './data/education'
import './App.css'

function App() {
  useEffect(() => {
    // Fragment targets are mounted by React after the initial HTML is loaded.
    const target = document.getElementById(window.location.hash.slice(1))
    target?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <>
      <Hero />
      <About />
      <Timeline
        title="경험이 연결되는 과정."
        career={careerEntries}
        companyMetas={companyMetas}
        graduation={educationEntries.filter((entry) => entry.title.includes('졸업'))}
      />
      <Projects />
      <Education />
    </>
  )
}

export default App
