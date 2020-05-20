import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRecipe } from '../../actions/recipes';

const CreateRecipe = ({ addRecipe, history }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        ingredients: '',
        instructions: ''
    }); 

    const {
        name,
        category,
        ingredients,
        instructions
    } = formData; 


const onChange = e => 
    setFormData({...formData, [e.target.name]: e.target.value });

const onSubmit = e => {
    e.preventDefault();
    addRecipe(formData, history);
}


    return (
    <Fragment>
        <form className="form" id='prof-form-1' onSubmit={e => onSubmit(e)}>
            <div className="form-group">
            <h2 className='mb-4 pt-5'>Add A Recipe</h2>
            <select name="category"
            value={category} 
            onChange={e => onChange(e)}>
                <option value="0">* Select Recipe Category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Desserts">Desserts</option>
                <option value="Healthy Foods">Healthy Foods</option>
                <option value="Drinks">Drinks</option>
                <option value="Other">Other</option>
            </select>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Recipe Name"
                    name="name"
                    value={name} 
                    onChange={e => onChange(e)}
                    required 
                    />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Ingredients"
                    name="ingredients"
                    value={ingredients} 
                    onChange={e => onChange(e)}
                    required 
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Instructions"
                    name="instructions"
                    value={instructions} 
                    onChange={e => onChange(e)}
                    required 
                />
            </div>
        <input type="submit" className="btn my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment> 
    )
}


CreateRecipe.propTypes = {
    addRecipe: PropTypes.func.isRequired,
};
  
  
export default connect(null, {addRecipe})(withRouter(CreateRecipe));
  
  