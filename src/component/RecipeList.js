
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import trashcan from '../assets/trashcan.svg';
import { projectFirestore } from "../firebase/config";

// styles 
import "./recipeList.css";

export default function RecipeList({recipes}) {
  const mode = useTheme()

  if (recipes.length === 0) {
   return <div className="error">No Recipes to load...</div>
  }

  const handleClick = (id) => {

    projectFirestore.collection('recipes').doc(id).delete();
  }
  
  return (
    <div className="recipes-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime} to make.</p>
            <div>{recipe.method.substring(0, 100 )}...</div>
            <Link to = {`/recipe/${recipe.id}`}>Cook this</Link>
            <img
              className="delete"
              onClick={() => handleClick(recipe.id)} 
              src={trashcan}
            />
        </div>

      ))}
    </div>
  )
}

