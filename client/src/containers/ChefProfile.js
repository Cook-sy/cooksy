import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import { Rating } from 'material-ui-rating';
import { fetchMealsByChef } from '../actions/index';
import HorizontalGrid from '../components/HorizontalGrid';
import RaisedButton from 'material-ui/RaisedButton';

import './ChefProfile.css';


class ChefProfile extends Component {
  componentDidMount() {
    this.props.fetchMealsByChef();
    console.log(this.props.meals);
  }

  render() {
    const { meals, chef } = this.props;

    if (!meals || !chef) {
      return <p>Loading.....</p>;
    }

    return (
      <div>
      <List>
        <ListItem
          disabled={true}
          leftAvatar={<Avatar src={chef.image} size={300} />}
        />
        <div className="chef-info">
          <h3>{chef.username}</h3>
          <Rating value={Math.ceil(chef.rating)} max={5} readOnly={true} />
          <RaisedButton className="request" label="Request a Meal" primary={true} />
        </div>
      </List>
      {meals.map((meal) => (
        <div>
          <HorizontalGrid key={meal.id} meals={this.props.fetchMealsByChef()}/>
        </div>
      ))}
      </div>
    );
  }
}

function mapStateToProps({ meals }) {
  return {
    meals: meals,
    chef: meals[0] && meals[0].chef
  };
}

export default connect(mapStateToProps, { fetchMealsByChef })(ChefProfile);
