import { useState, useEffect } from 'react'
import Landing from './Components/Landing'
import Projects from './Components/Projects'
import Experience from './Components/Experience'
import About from './Components/About'
import Footer from './Components/Footer'
import Connect from './Components/Connect'
import Resume from './Components/Resume'
import './App.scss'

function App() {
  const [isResumePage, setIsResumePage] = useState(false)

  useEffect(() => {
    setIsResumePage(window.location.pathname === '/resume')
  }, [])

  if (isResumePage) {
    return <Resume />
  }

  return (
    <div className="App">
      <a href="#projects" className="skip-to-content">Skip to content</a>
      <Landing />
      <main>
        <Projects />
        <Experience />
        <About />
        <Connect />
      </main>
      <Footer />
    </div>
  )
}

export default App
