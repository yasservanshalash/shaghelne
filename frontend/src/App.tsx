import './App.css'
import Navbar from './components/Navbar'
import HeroHome from './components/HeroHome'
import Partners from './components/Partners'
import TrendingServices from './components/TrendingServices'
import BrowserCategory from './components/section/BrowserCategory'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Navbar />
      <HeroHome />
      <Partners />

      <TrendingServices />
      <BrowserCategory />

    </Router>
  )
}

export default App
