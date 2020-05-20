import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_RECIPES,
    RECIPES_ERROR
} from './types';

// Get recipes
export const getRecipes = () => async dispatch => {
    try {
        const res = await axios.get('/api/recipes');

        dispatch({
            type: GET_RECIPES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: RECIPES_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};





// // Get current user's recipes
// export const getMyRecipeBook = () => async dispatch => {
//     try {
//         const res = await axios.get('/api/recipes/me');

//         dispatch({
//             type: GET_MY_RECIPES,
//             payload: res.data
//         })
//     } catch (err) {
//         dispatch({
//             type: RECIPE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         });
//     }
// };



// Add recipe
export const addRecipe = (
    formData, 
    history, 
    edit = false
) => async dispatch => {   
    const config = {
        headers: {
            'Content-Type': 'application/json'
            }
        };
    const res = await axios.post('/api/recipes', formData, config)

    dispatch({
        type: GET_RECIPES,
        payload: res.data
    });

    dispatch(setAlert('Recipe Added!', 'success'));
        if(!edit) {
        history.push('/dashboard');

    }
};
