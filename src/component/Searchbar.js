import { useState } from "react";
import { useHistory } from "react-router-dom";

// styles 
import "./searchbar.css";

export default function Searchbar() {
    const [term, setTerm] = useState('');
    const history = useHistory()

    const handleSearch = (e) => {
        e.preventDefault();

        history.push(`/search?q=${term}`)
    }
    
  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Search</label>
        <input 
            type="text"
            id="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
             />
      </form>
    </div>
  )
}
