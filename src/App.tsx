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
        title="Career"
        entries={careerEntries}
        groupByCompany
        companyMetas={companyMetas}
      />
      <Timeline title="Education" entries={educationEntries} />
      <Timeline title="Certificates & Courses" entries={etcEntries} detailInModal />
    </>
  )
}

export default App
