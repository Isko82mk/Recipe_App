import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { loadRecipe, state } from './model';
import recipeView from './Views/recipeView';

const controlRecipe = async function () {
  try {
    recipeView.renderSpinner();
    //hash id
    const id = window.location.hash.slice(1);
    if (!id) return;

    //load data to state
    await loadRecipe(id);

    //render recipe
    recipeView.render(state.recipe);

    console.log(state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};
init();
