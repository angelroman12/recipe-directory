import "./Home.css";
import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";

export default function Home() {
  const { data, isPending, error } = useFetch(
    "https://61aa7a5abfb110001773f26e.mockapi.io/recipes"
  );

  return (
    <div className="home">
      {error && <p>{error}</p>}
      {isPending && <h1>Loading...</h1>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
