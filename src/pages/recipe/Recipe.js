import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

// Hooks
import { useFetch } from "../../hooks/useFetch";

// Styles
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const url = `https://61aa7a5abfb110001773f26e.mockapi.io/recipes/${id}`;
  const { data: recipe, isPending, error } = useFetch(url);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      // if any error navigate(or redirect) to home page
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [error, navigate]);

  return (
    <div className="recipe">
      {error && <div className="error">{error}</div>}
      {isPending && <div className="loading">Loading...</div>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="methond"> {recipe.method}</p>
        </>
      )}
    </div>
  );
}
