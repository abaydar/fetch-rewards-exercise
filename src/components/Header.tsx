import { Link } from "react-router-dom"


const Header = () => {
    return (
        <nav className="bg-gray-100 border border-gray-200 rounded-lg flex gap-4 p-4 justify-end">
            <Link to="/">Auth</Link>
            <Link to="/search">Search</Link>
            <Link to="/favorites">Favorites</Link>
        </nav>
    )
}

export default Header