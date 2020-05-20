import {
    GET_RECIPES,
    RECIPES_ERROR,
    GET_MY_RECIPES,
    GET_RECIPES_BY_USER
} from '../actions/types';

const initialState = {
    recipes: [],
    recipe: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const { type, payload } = action

    switch(type) {
        case GET_RECIPES:
        case GET_MY_RECIPES: 
        case GET_RECIPES_BY_USER:
            return {
                ...state,
                recipes: payload,
                loading: false
            };
            case RECIPES_ERROR: 
            return {
                ...state,
                error: payload,
                loading: false
            };
            default: 
                return state; 
    }
}