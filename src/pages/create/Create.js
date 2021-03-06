import "./Create.css";
import { useRef, useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const history = useNavigate();
  const { postData, data, error } = useFetch(
    "https://61aa7a5abfb110001773f26e.mockapi.io/recipes",
    "POST"
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  useEffect(() => {
    if (data) {
      history("/");
    }
  }, [data]);
  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:
          {ingredients.map((i) => (
            <em key={i}> {i}, </em>
          ))}
        </p>
        <label>
          <span>Recipe Method:</span>
          <input
            type="text"
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking time:</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">Add</button>
      </form>
    </div>
  );
}
