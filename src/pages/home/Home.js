import "./Home.css";
import { useFetch } from "../../hooks/useFetch";

export default function Home() {
  const { data, isPending, error } = useFetch(
    "https://61aa7a5abfb110001773f26e.mockapi.io/recipes"
  );

  return (
    <div className="home">
      {error && <p>{error}</p>}
      {isPending && <h1>Loading...</h1>}
      {data && data.map((recipe) => <h2 key={recipe.id}>{recipe.title}</h2>)}
    </div>
  );
}
