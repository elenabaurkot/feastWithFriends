import React, {Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecipesByUserId } from '../../actions/recipes';
import Spinner from '../layout/Spinner';
import RecipeItem from './RecipeItem';

const GetRecipesByUser = ({ 
    getRecipesByUserId, 
    recipes: { recipes, loading } 
}) => {
    useEffect(() => {
        getRecipesByUserId();
    }, [getRecipesByUserId]);

    return (
    loading ? 
    <Spinner />
        : 
    <Fragment>
        <h1 className='large text-dark'>Recipes</h1>
        <div className='recipes'>
            {recipes.map(recipe => (
                <RecipeItem key={recipes._id} recipes={recipe} />
            ))}
        </div>
    </Fragment>
    )
}

GetRecipesByUser.propTypes = {
    getRecipesByUserId: PropTypes.func.isRequired,
    recipes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    recipes: state.recipes
})

export default connect(mapStateToProps, { getRecipesByUserId })(GetRecipesByUser);
