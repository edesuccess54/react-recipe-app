
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// styeles 
import "./navbar.css";

// Components 
import Searchbar from "./Searchbar";


export default function Navbar() {

  const { color } = useTheme()
  return (
    <div className="navbar" style={{background: color}}>
      <nav>
        <Link to="/" className="brand">
            <h2>Cooking Ninja</h2>
        </Link>
        <Searchbar />
        <Link to="/create">Creat Recipe</Link>
      </nav>
    </div>
  )
}
