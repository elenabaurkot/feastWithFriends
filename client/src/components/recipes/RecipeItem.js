import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";

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
  <div>
    <h4>{name}</h4>
    <p>Posted by {user.name} on <Moment format='YYYY/MM/DD'>{date}</Moment></p>
    <p>{category}</p>
    <div className='skills'>
    <h5>Instructions</h5>
    <div class='instructions'>
        {instructions.map((instruction, index) => (
            <div key={index} className='p-1'>
            {index + 1}{instruction}
            </div>
        ))}
    </div>
    <h5>Ingredients</h5>
    <div class='ingredients'>
        {ingredients.map((ingredient, index) => (
            <div key={index} className='p-1'>
            {index + 1}{ingredient}
            </div>
        ))}
    </div>
        <span>{likes.length}</span>
        <span>{comments.length}</span>
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
