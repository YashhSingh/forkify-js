import icons from 'url:../../img/icons.svg';
export default class View {
    _data;

    render(data) {
        if (!data || Array.isArray(data) && data.length === 0) return this.renderError()
        this._data = data;
        this._clear();
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('beforeend', markup)
    }
    _clear() {
        this._parentElement.innerHTML = '';
    };
    renderspinner() {
        const markup = `<div class="spinner">
          <svg>
            <use href="${icons}svg#icon-loader"></use>
          </svg>
          </div>`
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };

    renderError(message = this._default_error_message) {
        const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}.svg#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
    </div>`
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup)
    };

    renderSuccess(messge = this._success_message) {
        const markup = `<div class="message">
          <div>
            <svg>
              <use href="${icons}.svg#icon-smile"></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>`
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup)
    };
}