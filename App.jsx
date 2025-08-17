import { Outlet } from 'react-router-dom'
import Header from '/components/Header'
import './App.css'
import { ThemeProvider } from './Contexts/ThemeContext'
const App = () => {
  
  return (
      <ThemeProvider>
      <Header />
      <Outlet />
      </ThemeProvider>
  )
}

export default App
