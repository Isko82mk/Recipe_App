import icon from '../../img/icons.svg';
import fracty from 'fracty';

class RecipeView {
  _data;
  _parentElement = document.querySelector('.recipe');
  _errorMsg = 'We couldn not find that recipe. Pls try another one';
  _successMsg = '';

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    //convert newMarkup To DOM object aka Virtual DOM lives in memory
    const newDom = document.createRange().createContextualFragment(newMarkup);

    //DOM virtual elements and converting them in array
    const newElements = Array.from(newDom.querySelectorAll('*'));

    //////////////////////////////////////////////////////////////////////////////

    //Curent elements on the real DOM and converting them to array
    const curentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    // COMPERING THE TWO ARRAYS newElements to curentElements

    newElements.forEach((newEl, i) => {
      const curEl = curentElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(atr =>
          curEl.setAttribute(atr.name, atr.value)
        );
      }
    });

    //console.log(newElements);
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this.clean();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  clean() {
    this._parentElement.innerHTML = '';
  }

  renderInitialMesage() {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icon}.svg#icon-smile"></use>
      </svg>
    </div>
    <p>Start by searching for a recipe or an ingredient. Have fun!</p>
  </div>`;
    this.clean();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(mesage = this._errorMsg) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icon}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${mesage}</p>
  </div>`;

    this.clean();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccessMsg(mesage = this._successMsg) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icon}#icon-smile"></use>
      </svg>
    </div>
    <p>${mesage}</p>
  </div>`;

    this.clean();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icon}#icon-loader"></use>
    </svg>
  </div>`;
    this.clean();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `   <figure class="recipe__fig">
    <img src="${this._data.imageUrl}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icon}.svg#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icon}.svg#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button data-togo="${
          this._data.servings - 1
        }" class="btn--tiny btn--update">
          <svg>
            <use href="${icon}.svg#icon-minus-circle"></use>
          </svg>
        </button>
        <button data-togo="${
          this._data.servings + 1
        }" class="btn--tiny btn--update">
          <svg>
            <use href="${icon}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icon}.svg#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icon}.svg#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this._data.ingredients
      .map(data => this._generateIngredientsMarkup(data))
      .join('')}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This this._data was carefully designed and tested by
      <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  _generateIngredientsMarkup(data) {
    return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icon}.svg#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      data.quantity === null ? '' : fracty(data.quantity)
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit"${data.unit}</span>
      ${data.description}
    </div>
  </li>
`;
  }

  addHandlerBookmark(subscriber) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      console.log(btn);
      subscriber();
    });
  }

  addHandlerUpadateServings(subscriber) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update');
      if (!btn) return;
      const newServing = +btn.dataset.togo;
      if (newServing < 1) return;
      console.log(newServing);
      subscriber(newServing);
    });
  }

  addHandlerRender(subscriber) {
    ['load', 'hashchange'].forEach(el =>
      window.addEventListener(el, subscriber)
    );
  }
}

export default new RecipeView();
