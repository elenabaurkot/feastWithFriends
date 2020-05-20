import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";

const RecipeItem = ({
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
  </div>
  );
};

RecipeItem.propTypes = {
  post: PropTypes.object.isRequired,
};


export default connect(null, {})(RecipeItem);
