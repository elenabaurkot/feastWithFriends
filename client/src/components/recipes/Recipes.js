import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner'; 
import RecipeItem from './RecipeItem';
import { getProfiles } from '../../actions/profile';

const Recipes = props => {
    return (
    <div>
            <h1 className='large text-primary'>Recipes</h1>
            <p className='lead'>
                Check out other Feastify users' creations!
            </p>
            </div>
    )
}

Recipes.propTypes = {

}

export default Recipes;
