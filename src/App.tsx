import { useState } from 'react'
import './App.css'
import { Login } from './components/Login'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleIsAuthenticated = (isLoggedIn: boolean) => {
    setIsAuthenticated(isLoggedIn)
  }
  console.log('isAuthenticated: ', isAuthenticated)
  return (
    <>
      <h1>Doggy Dog</h1>
      <div className="card">
        {!isAuthenticated && <Login setIsAuthenticated={handleIsAuthenticated}/>}
      </div>
    </>
  )
}

export default App
