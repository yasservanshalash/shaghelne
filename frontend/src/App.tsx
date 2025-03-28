import './App.css'
import Navbar from './components/Navbar'
import HeroHome from './components/HeroHome'
import Partners from './components/Partners'
import TrendingServices from './components/TrendingServices'
import BrowserCategory from './components/section/BrowserCategory'
import { BrowserRouter as Router } from 'react-router-dom'
import NeedSomething2 from './components/section/NeedSomething2'
import CtaBanner18 from './components/section/CtaBanner18'
import Testimonial2 from './components/section/Testimonial2'
import InspireingWork20 from './components/section/InspireingWork20'
import InspiringService11 from './components/section/InspiringService11'
import CtaBanner21 from './components/section/CtaBanner21'
import Footer from './components/footer/Footer'
function App() {
  return (
    <Router>
      <Navbar />
      <HeroHome />
      <Partners />
      <TrendingServices />
      <BrowserCategory />
      <NeedSomething2 />
      <CtaBanner18 />
      <Testimonial2 />
      <InspireingWork20 />
      <InspiringService11 />
      <CtaBanner21 />
      <Footer />
    </Router>
  )
}

export default App
