import './App.css'


import NavBar from "./components/NavBar/NavBar"
import Banner from "./components/Banner/Banner"
import ServicesOptions from "./components/ServicesOptions/ServicesOptions"
import ChooseDate from "./components/ChooseDate/ChooseDate"
import Footer from './components/Footer/Footer'

function App() {

  return (
    <div >
    <NavBar />
    <Banner />
    <ServicesOptions />
    <ChooseDate />
    <Footer />
    </div>
  )
}

export default App
