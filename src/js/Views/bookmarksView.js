import icon from '../../img/icons.svg';

class BookmarksView {
  _data;
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMsg = 'No bookmarks yet.Search and bookmark your fav recipe :)';
  _successMsg = '';

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this.clean();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clean() {
    this._parentElement.innerHTML = '';
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

  _generateMarkup() {
    return this._data.map(data => {
      return `<li class="preview">
      <a class="preview__link " href="#${data.id}">
        <figure class="preview__fig">
          <img src="${data.imageUrl}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${data.title}</h4>
          <p class="preview__publisher">${data.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icon}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
      </li>`;
    });
  }
}

export default new BookmarksView();
