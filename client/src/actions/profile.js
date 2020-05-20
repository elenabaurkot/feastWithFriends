import axios from 'axios'; 
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES,
} from './types';

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Update profile
export const createProfile = (
    formData, 
    history, 
    edit = false
) => async dispatch => {   
    const config = {
        headers: {
            'Content-Type': 'application/json'
            }
        };
    const res = await axios.post('/api/profile', formData, config)

    dispatch({
        type: GET_PROFILE,
        payload: res.data
    });

    dispatch(setAlert('Profile Updated', 'success'));
    history.push('/dashboard');
};


// Delete account and profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
        try {
            await axios.delete('/api/profile');
    
            dispatch({type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});

            dispatch(setAlert('Your account has been permanently deleted'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
}