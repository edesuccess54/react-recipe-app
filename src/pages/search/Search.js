import { useLocation } from "react-router-dom"
import RecipeList from "../../component/RecipeList";
import { UseFetch } from "../../hooks/UseFetch";


// styles 
import "./search.css"

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');

  const url = 'http://localhost:3000/recipes?q=' + query;
  const {data:recipes, isError, isPending} = UseFetch(url);

  console.log(queryParams, query);
  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      { isPending && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes = {recipes} />}

    </div>
  )
}
