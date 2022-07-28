import icons from 'url:../../img/icons.svg';
import View from "./view.js";

class paginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _generateMarkup() {
        const Number_of_page = Math.ceil(this._data.search_results.length / this._data.results_per_page);
        console.log(Number_of_page);
        console.log(this._data.page);

        //case 1 if we are on page 1 and there are other pages
        if (this._data.page === 1 && Number_of_page > this._data.page) {

            return console.log('haha');
        }
        //last page
        if (this._data.page === Number_of_page && Number_of_page > this._data.page) {

            return 'Last Page';
        }
        //other page
        if (this._data.page < Number_of_page) {

            return console.log('haha');;
        }
        //case 2 if we are on page 1 and there are no other pages
        return 'Page 1 and other';

    }
}

export default new paginationView();