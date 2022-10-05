import {BrowserRouter, Route, Link, Switch, Redirect} from "react-router-dom"

// page components
import Navbar from "./component/Navbar"
import Create from "./pages/create/Create"
import Home from "./pages/home/Home"
import Recipe from "./pages/recipe/Recipe"
import Search from "./pages/search/Search"
import ThemeSelector from "./component/ThemeSelector"
import { useTheme } from "./hooks/useTheme"

// App styls 
import './App.css';

function App() {

  const { mode } = useTheme()
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />

        <ThemeSelector /> 

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/create">
            <Create />
          </Route>

          <Route path="/search">
            <Search />
          </Route>

          <Route path="/recipe/:id">
            <Recipe />
          </Route>

          <Route path="*">
            <Redirect to ="/" />
          </Route>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
