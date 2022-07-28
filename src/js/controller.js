import 'core-js/stable'; // polyfilling everything else 
import 'regenerator-runtime/runtime'  //pollyfilling async await 
// import { loadRecipe } from './model.js'
// import { state } from './model.js'
import * as model from './model.js'
import { render } from 'sass';
import recipeView from './view/recipeView.js';
import searchViews from './view/searchView.js';
import resultsView from './view/resultsview.js';
import paginationView from './view/paginationView.js';


// if (module.hot) {
//   module.hot.accept();
// }
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1) //getting hash dynamically from window location 
    // console.log(id);
    if (!id) return;
    recipeView.renderspinner();
    await model.loadRecipe(id);
    // const { recipe } = model.state;
    recipeView.render(model.state.recipe)

  } catch (err) {
    recipeView.renderError();  //ye bhi publisher subscriber pattern me hai 
  }
}

controlRecipes();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes); //same codes -->> !! violating DRY principle

// A better way ___ with loop because we want to run same function on both events ---> in recipeview addhandler

//Search results functionality

const controlsearchResults = async function () {
  try {
    resultsView.renderspinner()
    //part 1 => getting searched item
    const ItemSearched = searchViews.getSearchedItem()

    if (!ItemSearched) return;
    //part 2 => loading searched item
    await model.loadsearchResults(ItemSearched);


    // console.log(model.state.search);
    // console.log(model.state.search.search_results);
    // resultsView.render(model.state.search.search_results)

    //part 3 => rendering all searched items
    resultsView.render(model.getSearchresults(2));

    //part 4 => getting searched item
    paginationView.render(model.state.search)

  } catch (err) {
    console.log(err);
  }
};




const init = function () {
  recipeView.addHandler(controlRecipes)
  searchViews.addHandlerSearch(controlsearchResults)
}
// this init function is done because ---> read explanation from notebook
init();