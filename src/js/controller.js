import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { getSearchResultsPage, loadRecipe, searchRecipe, state } from './model';
import recipeView from './Views/recipeView';
import searchView from './Views/searchView';
import resultsView from './Views/resultsView';
import paginationView from './Views/paginationView';

const controlRecipe = async function () {
  try {
    recipeView.renderSpinner();
    //hash id
    const id = window.location.hash.slice(1);
    if (!id) {
      return recipeView.renderInitialMesage();
    }

    //load data to state
    await loadRecipe(id);

    //render recipe
    recipeView.render(state.recipe);

    //console.log(state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await searchRecipe(query);

    resultsView.render(getSearchResultsPage());
    console.log(state.search);
    paginationView.render(state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(getSearchResultsPage(goToPage));

  paginationView.render(state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSerch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
};

init();
