import icon from '../../img/icons.svg';

class AddRecipeView {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');

  _btnOpenForm = document.querySelector('.nav__btn--add-recipe');
  _btnCloseForm = document.querySelector('.btn--close-modal');

  constructor() {
    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
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

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerUpload(subscriber) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];

      const dataObject = Object.fromEntries(data);
      subscriber(dataObject);
    });
  }

  addHandlerShowWindow() {
    this._btnOpenForm.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerHideWindow() {
    this._btnCloseForm.addEventListener('click', this.toggleWindow.bind(this));
  }
}

export default new AddRecipeView();
