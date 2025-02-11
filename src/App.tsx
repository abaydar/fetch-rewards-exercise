import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import { AuthProvider } from './providers/AuthProvider'
import { FavoritesProvider } from './providers/FavoritesProvider'
import Favorites from './pages/Favorites'
import Header from './components/Header'

function App() {

  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  )
}

export default App
