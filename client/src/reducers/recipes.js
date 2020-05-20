import { 
    // GET_RECIPE??
    GET_MY_RECIPES,
    GET_RECIPES, 
    RECIPE_ERROR,
    // CLEAR_RECIPES
 } from "../actions/types";

const initialState = {
recipe: null,
recipes: [],
loading: true,
error: {}
}

export default function(state = initialState, action) {
const { type, payload } = action; 

switch(type) {
   case GET_MY_RECIPES: 
       return {
           ...state,
           recipe: payload,
           loading: false
       };
   case RECIPE_ERROR: 
       return {
           ...state,
           error: payload,
           loading: false
       };
//    case CLEAR_RECIPES: 
//        return {
//            ...state,
//            recipe: null,
//            loading: false
//        };
   default: 
       return state;
}
}