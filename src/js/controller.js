import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { loadRecipe, state } from './model';
import recipeView from './Views/recipeView';

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

const controlRecipe = async function () {
  const id = window.location.hash.slice(1);

  await loadRecipe(id);

  recipeView.render(state.recipe);
  console.log(state.recipe);
};

controlRecipe();
