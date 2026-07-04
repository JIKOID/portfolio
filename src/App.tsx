import Hero from './components/Hero'
import Timeline from './components/Timeline'
import { careerEntries } from './data/career'
import { educationEntries } from './data/education'
import './App.css'

function App() {
  return (
    <>
      <Hero />
      <Timeline title="Career" entries={careerEntries} groupByCompany />
      <Timeline title="Education" entries={educationEntries} />
    </>
  )
}

export default App
