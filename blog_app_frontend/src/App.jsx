import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/header/Header'
import ScrollToTop from './config/ScrollToTopjs'

function App() {

  return (
    <>
      <Header/>
      <ScrollToTop/>
      <Outlet/>
      <Footer/> 
    </>
  )
}

export default App
