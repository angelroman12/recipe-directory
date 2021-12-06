import { useLocation, useSearchParams } from "react-router-dom";
import "./Search.css";
import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";
import { useEffect } from "react";
export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");
  const [searchParams, setSearchParams] = useSearchParams({});
  const url = "https://61aa7a5abfb110001773f26e.mockapi.io/recipes?q=" + query;
  const { error, isPending, data } = useFetch(url);
  useEffect(() => {
    searchParams.get("recipe");
  }, [data]);

  return (
    <div>
      <h2 className="page-title"> Recipes include "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading"> Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
