import { API_URL } from './config';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();

  const { recipe } = data.data;

  state.recipe = {
    id: recipe.id,
    cookingTime: recipe.cooking_time,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
  };
};
