import { projectFirestore} from '../../firebase/config'
import { useEffect, useState } from 'react';

// styles 
import "./home.css"

// components
import RecipeList from "../../component/RecipeList";


export default function Home() {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isPending, setIspending] = useState(false);

    useEffect(() => {
      setIspending(true);
      
      const unsub = projectFirestore.collection('recipes').onSnapshot((snapshots) => {
          if(snapshots.empty) {
            setIsError('No recipes to load');
            setIspending(false)
          } else {
            let results = [];
            snapshots.docs.forEach((doc) => {
              results.push({ id: doc.id, ...doc.data() })
            })
            setData(results);
            setIspending(false)
          }
        }, (err) => {
          setIspending(false)
          setIsError(err.message);
        })

        return () => unsub()
    }, []);

  return (
    <div className="home">
      { isPending && <p className="loading">Loading...</p>}
      {isError && <p className="error">{isError}</p>}
      {data && <RecipeList recipes = {data} />}
    </div>
  )
}
