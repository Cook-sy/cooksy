import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import RaisedButton from 'material-ui/RaisedButton';
import { Rating } from 'material-ui-rating';
import _ from 'lodash';

import { fetchMeals, getNearbyMeals, getUserDetails } from '../actions/index';
import './MealList.css';

class MealList extends Component {
  constructor(props) {
    super(props);
    this.showNearbyMeals = this.showNearbyMeals.bind(this);
  }

  componentDidMount() {
    this.props.fetchMeals();
    this.props.getUserDetails();
  }

  showNearbyMeals() {
    this.props.getNearbyMeals(this.props.user.zipcode);
  }

  render() {
    const { user } = this.props;
    const style = {
      marginRight: 8
    }
    return (
      <div className="root">
        <RaisedButton style={style} label="ALL Meals" onClick={this.props.fetchMeals} />
        <RaisedButton 
          style={style}
          label="Nearby Meals" 
          title={ 
            user.user 
            ? "Look for nearby meals" 
            : "Please Signup/Login to view nearby meals"
          } onClick={this.showNearbyMeals} 
          disabled={!user.user} 
        />
        
        <GridList
          cellHeight={180}
          className="grid-list"
        >
          <Subheader>List of Meals</Subheader>
          {_.map(this.props.meals, (meal) => (
            <GridTile
              key={meal.name}
              title={<Link to={`/meals/${meal.id}`} style={{color:'white', textDecoration: 'none'}}>{meal.name}</Link>}
              subtitle={<span>by <b>{meal.chef.username}</b></span>}
              actionIcon={<Rating value={Math.ceil(meal.rating)} max={5} readOnly={true} />}
            >
              <img src={meal.images} alt="meal list"/>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

function mapStateToProps({ meals, auth: { user } }) {
  return { 
    meals: meals,
    user: user
  };
}

export default connect(mapStateToProps, { fetchMeals, getNearbyMeals, getUserDetails })(MealList);