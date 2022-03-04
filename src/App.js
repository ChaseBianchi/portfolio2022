import Landing from './Components/Landing';
import Projects from './Components/Projects';
import Experience from './Components/Experience';
import About from './Components/About';
import Footer from './Components/Footer';
import Nav from './Components/Nav';
import Connect from './Components/Connect';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Landing />
      <Projects/>
      <Experience />
      <About />
      <Connect />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
