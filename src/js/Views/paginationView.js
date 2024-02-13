import icon from '../../img/icons.svg';

class PaginationView {
  _parentElement = document.querySelector('.pagination');

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clean();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerClick(subscriber) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      subscriber(goToPage);
    });
  }

  _clean() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkup() {
    let resultsPerPage = this._data.resultsPerPage;
    const numOfPages = Math.ceil(this._data.results.length / resultsPerPage);
    const curentPage = this._data.page;

    console.log('curent page', curentPage);
    console.log('number of pages', numOfPages);

    // page 1, and ther are other pages
    if (curentPage === 1 && numOfPages > 1) {
      return `
    
              <button data-goto="${
                curentPage + 1
              }" class="btn--inline pagination__btn--next">
                <span>Page ${curentPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icon}#icon-arrow-right"></use>
                </svg>
              </button>
        `;
    }
    // last page
    if (curentPage === numOfPages && numOfPages > 1) {
      return `
        <button data-goto="${
          curentPage - 1
        }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icon}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curentPage - 1}</span>
              </button>
       
        `;
    }
    // other pages
    if (curentPage < numOfPages) {
      return `
        <button data-goto=" ${
          curentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curentPage - 1}</span>
        </button>
        <button data-goto=" ${
          curentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curentPage + 1}</span>
            <svg class="search__icon">
            <use href="${icon}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    return '';
  }
}

export default new PaginationView();
