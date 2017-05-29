import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class NewPostForm extends Component {
  render() {
    return (
      <form>
        <div>
          <label>Name</label>
          <div>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="Your Name"
            />
          </div>
        </div>
        <div>
          <label>Description</label>
          <div>
            <Field
              name="description"
              component="textarea"
              type="textarea"
              placeholder="Description"
            />
          </div>
        </div>
        <div>
          <label>Delivery Date</label>
          <div>
            <Field
              name="delivery-date"
              component="input"
              type="date"
            />
          </div>
        </div>
        <div>
                <label>Photos</label>
                <div>
                  <Field
                    name="photo_1"
                    component="input"
                    type="text"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <Field
                    name="photo_2"
                    component="input"
                    type="text"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <Field
                    name="photo_3"
                    component="input"
                    type="text"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <Field
                    name="photo_4"
                    component="input"
                    type="text"
                    placeholder="Your Name"
                  />
                </div>
              </div>
        <div>
          <label>Price</label>
          <div>
            <Field name="price" component="input" type="text"/>
          </div>
          <label>Servings</label>
          <div>
            <Field name="servings" component="input" type="text"/>
          </div>
        </div>
        <div>
          <label>Addresee</label>
          <div>
            <Field name="address" component="input" type="text"/>
          </div>
          <label>City</label>
          <div>
            <Field name="city" component="input" type="text"/>
          </div>
          <label>State</label>
          <div>
            <Field name="state" component="input" type="text"/>
          </div>
          <label>Zipcode</label>
          <div>
            <Field name="zipcode" component="input" type="text"/>
          </div>
        </div>
        <div>
          <button type="submit" >Submit</button>
          <button type="button" >
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}
       
export default reduxForm({
  form: 'NewPostForm' 
})(NewPostForm);