// styles 
import "./recipe.css"

import {useHistory, useParams} from "react-router-dom"
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

export default function Recipe() {
  const { id } = useParams();

  const history = useHistory()
  const mode = useTheme()

  const [recipe, setRecipe] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isPending, setIspending] = useState(false);

  useEffect(() => {
    setIspending(true);

    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {

        if(!doc.exists) {
          setIspending(false)
          setIsError('Could not find that recipe')
        } else {
          setIspending(false);
          setRecipe(doc.data())
        }
        
      })

      return () => unsub();
  }, [id])

  useEffect(() => {
    setTimeout(() => {
      if(isError) {
        history.push("/")
      }
    },2000)
  }, [isError])

  const handleClik = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Banana smoothie'
    })
  }

  return (
    <div className={`recipe ${mode}`}>
      {isPending && <p className="loading">Loading</p>}
      {isError && <p className="error">{isError}</p>} 

      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to make</p>
          <ul>
            {recipe.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClik}>Update me</button>
        </>
      )}

    </div>
  )
}
