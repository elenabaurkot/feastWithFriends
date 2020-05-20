import React, {Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyRecipeBook } from '../../actions/recipes';
import Spinner from '../layout/Spinner';
import RecipeItem from './RecipeItem';

const GetMyRecipeBook = ({ 
    getMyRecipeBook, 
    recipes: { recipes, loading } 
}) => {
    useEffect(() => {
        getMyRecipeBook();
    }, [getMyRecipeBook]);

    return (
    loading ? 
    <Spinner />
        : 
    <Fragment>
        <div className='recipes'>
            {recipes.map(recipe => (
                <RecipeItem key={recipes._id} recipes={recipe} />
            ))}
        </div>
    </Fragment>
    )
}

GetMyRecipeBook.propTypes = {
    getMyRecipeBook: PropTypes.func.isRequired,
    recipes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    recipes: state.recipes
})

export default connect(mapStateToProps, { getMyRecipeBook })(GetMyRecipeBook);
