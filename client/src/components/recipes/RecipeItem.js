import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import './recipeStyles.css';

const RecipeItem = ({ auth,
  recipes: {
    _id,
    name,
    category,
    ingredients,
    instructions,
    user,
    likes,
    comments,
    date,
  },
}) => {
  return (
  <div class='bg-light'>
    <h3 className='recipe-title'>{name}</h3>
    <h6>Posted by {user.name} on <Moment format='YYYY/MM/DD'>{date}</Moment></h6>
    <h5 className='cap'>Category: {category}</h5>
    <div className='skills'>
    <h4>Instructions</h4>
    <div class='instructions'>
      <ul className='listing'>
        {instructions.map((instruction, index) => (
          <li>
            <div key={index} className='p-1'>
            {instruction}
            </div>
          </li>
        ))}
      </ul>
    </div>
    <h4>Ingredients</h4>
    <div class='ingredients'>
      <ul className='listing'>
        {ingredients.map((ingredient, index) => (
          <li>
            <div key={index} className='p-1'>
              {ingredient}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  </div>
  );
    }

RecipeItem.propTypes = {
  recipes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(RecipeItem);
