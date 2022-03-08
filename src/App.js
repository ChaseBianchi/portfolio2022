import React, {useState} from 'react';
import Landing from './Components/Landing';
import Projects from './Components/Projects';
import Experience from './Components/Experience';
import About from './Components/About';
import Footer from './Components/Footer';
import Connect from './Components/Connect';
import './App.scss';

function App() {

  return (
    <div className="App">
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
