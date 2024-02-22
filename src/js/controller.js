import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  addBookmark,
  deleteBookmark,
  getSearchResultsPage,
  loadRecipe,
  loadSearchResults,
  state,
  updateServings,
  uploadRecipe,
} from './model';
import recipeView from './Views/recipeView';
import searchView from './Views/searchView';
import resultsView from './Views/resultsView';
import paginationView from './Views/paginationView';
import bookmarksView from './Views/bookmarksView';
import addRecipeView from './Views/addRecipeView';

const controlRecipe = async function () {
  try {
    recipeView.renderSpinner();
    resultsView.update(getSearchResultsPage());
    bookmarksView.render(state.bookmarks);
    //hash id
    const id = window.location.hash.slice(1);
    if (!id) {
      return recipeView.renderInitialMesage();
    }

    //load data to state
    await loadRecipe(id);

    //render recipe
    recipeView.render(state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await loadSearchResults(query);

    resultsView.render(getSearchResultsPage());

    paginationView.render(state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(getSearchResultsPage(goToPage));

  paginationView.render(state.search);
};

const controlServings = function (newServing) {
  updateServings(newServing);
  //recipeView.render(state.recipe);

  recipeView.update(state.recipe);
};

const controlAddBookmark = function () {
  if (!state.recipe.bookmarked) {
    addBookmark(state.recipe);
  } else {
    deleteBookmark(state.recipe.id);
  }

  recipeView.update(state.recipe);

  console.log(state.bookmarks);
};

const controlAddRecipe = async function (newRecipeData) {
  try {
    //show loading spinner
    addRecipeView.renderSpinner();

    await uploadRecipe(newRecipeData);
    console.log(state.recipe);

    //renderRecipe
    recipeView.render(state.recipe);
    //success msg
    addRecipeView.renderSuccessMsg();

    //RENDER BOOKMARK VIEW
    bookmarksView.render(state.bookmarks);

    //chage ID un url

    window.history.pushState(null, '', `#${state.recipe.id}`);

    // closeForm
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2000);
  } catch (error) {
    addRecipeView.renderError(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSerch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpadateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
