import icons from 'url:../../img/icons.svg';
import View from "./view.js";

class ResultsView extends View {
  _parentElement = document.querySelector('.search-results');
  _default_error_message = 'We could not find that recipe, please try another one';
  _success_message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._returnPreview).join('');

  }
  _returnPreview(data) {
    return ` <li class="preview">
          <a class="preview__link " href="#${data.id}">
              <figure class="preview__fig">
                  <img src="${data.imageurl}" alt="${data.title}" />
              </figure>
              <div class="preview__data">
                  <h4 class="preview__title">${data.title}</h4>
                  <p class="preview__publisher">${data.publisher}</p>
              </div>
          </a>
       </li> `
  }

}
export default new ResultsView()