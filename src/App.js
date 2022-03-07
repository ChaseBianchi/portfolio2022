import React, {useState} from 'react';
import Landing from './Components/Landing';
import Projects from './Components/Projects';
import Experience from './Components/Experience';
import About from './Components/About';
import Footer from './Components/Footer';
// import Nav from './Components/Nav';
import Connect from './Components/Connect';
import './App.scss';
// import NavMobile from './Components/NavMobile';
// import NavDesktop from './Components/NavDesktop';

function App() {
  // const [isOpen, setIsOpen] = useState(false)
  // const handleMenuClose = () => setIsOpen(false)
  // const handleMenuOpen = () => setIsOpen(true)
  return (
    <div className="App">
      {/* <Nav isOpen={isOpen} handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen}/> */}
      <Landing />
      <Projects/>
      <Experience />
      <About />
      <Connect />
      <Footer />
    </div>
  );
}

export default App;
