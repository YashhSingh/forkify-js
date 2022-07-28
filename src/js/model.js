import { async } from 'regenerator-runtime'; //for pollyfilling async functions and saving it in a async named variable
import { API_URL } from './config.js';
import { getJSON } from './helper.js';
import { RES_PER_PAGE } from './config.js';
export const state = {
    recipe: {},
    search: {
        Searched_item: '',
        search_results: [],
        results_per_page: RES_PER_PAGE,
        page: 1
    }
}

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}/${id}`);
        // console.log(data);
        let { recipe } = data.data;

        state.recipe = {
            id: recipe.id,
            cookingtime: recipe.cooking_time,
            imageurl: recipe.image_url,
            ingredients: recipe.ingredients,
            publisher: recipe.publisher,
            servings: recipe.servings,
            title: recipe.title,
            sourceurl: recipe.source_url,
        }
        // console.log(state.recipe);
        // console.log(recipe);
    } catch (err) {
        console.log(err);
        throw err
    }
};

export const loadsearchResults = async function (Searched_item) {
    try {
        state.search.Searched_item = Searched_item;
        const data = await getJSON(`${API_URL}?search=${Searched_item}`);
        // console.log(data);

        state.search.search_results = data.data.recipes.map(elem => {
            return {
                id: elem.id,
                imageurl: elem.image_url,
                publisher: elem.publisher,
                title: elem.title,
            };
        });
        // console.log(state.search.search_results);

    } catch (err) {
        console.log(err);
        throw err
    }
};

export const getSearchresults = function (page_number = state.search.page) {
    state.search.page = page_number
    const start = (page_number - 1) * state.search.results_per_page; //0
    const end = page_number * state.search.results_per_page;//9
    return state.search.search_results.slice(start, end);
}

// ye above function humne banaya hai taaki hum jon result ayega usse kuch hi items dikhaye fir
// aur baaki items hum next page me dikhaye ye pagination functionality k liye hai.