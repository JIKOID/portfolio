import Hero from './components/Hero'
import Timeline from './components/Timeline'
import { careerEntries, companyMetas } from './data/career'
import { educationEntries } from './data/education'
import { etcEntries } from './data/etc'
import './App.css'

function App() {
  return (
    <>
      <Hero />
      <Timeline
        title="Journey"
        career={careerEntries}
        companyMetas={companyMetas}
        side={[...educationEntries, ...etcEntries]}
      />
    </>
  )
}

export default App
