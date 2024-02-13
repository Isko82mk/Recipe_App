import icon from '../../img/icons.svg';
class ResultsView {
  _data;
  _parentElement = document.querySelector('.results');

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clean();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clean() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(data => this._generateMarkupPreview(data)).join('');
  }

  _generateMarkupPreview(data) {
    return `
    <li class="preview">
    <a class="preview__link preview__link--active" href="#${data.id}">
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
  }
}

export default new ResultsView();
