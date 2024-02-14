import icon from '../../img/icons.svg';
class ResultsView {
  _data;
  _parentElement = document.querySelector('.results');

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
        newEl.firstChild.nodeValue.trim() !== ''
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
    this._clean();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clean() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(data => this._generateMarkupPreview(data)).join('');
  }

  _generateMarkupPreview(data) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
    <a class="preview__link ${
      data.id === id ? 'preview__link--active' : ''
    } " href="#${data.id}">
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
