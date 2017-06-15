import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import { Rating } from 'material-ui-rating';
import _ from 'lodash';

import { fetchMeals, getUserDetails } from '../actions/index';
import './MealList.css';
import SearchBar from './SearchBar';

class MealList extends Component {
  componentDidMount() {
    this.props.fetchMeals();
    this.props.getUserDetails();
  }

  render() {
    const style = { marginRight: 8 };

    return (
      <div className="root">
        <Link to="/meals">
          <RaisedButton style={style} label="ALL Meals" primary={true} />
        </Link>

        <Link to="/nearby-meals">
          <RaisedButton style={style} label="Nearby Meals" />
        </Link>

        <div>
          <SearchBar />
        </div>

        <GridList
          cellHeight={305}
          className="grid-list"
        >
          <Subheader>List of Meals</Subheader>
          {_.map(this.props.meals, (meal) => (
            <GridTile
              key={meal.id}
              title={<Link to={`/meals/${meal.id}`} className="un-linkify" >{meal.name}</Link>}
              subtitle={<Link to={`/chefs-profile/${meal.chef.id}`} target="#" className="un-linkify" >by <b>{meal.chef.username}</b></Link>}
              actionIcon={<Rating value={Math.ceil(meal.rating)} max={5} readOnly={true} />}
            >
              <div className="date-wrapper">
                <img src={meal.images} alt="meal list"/>
                <div className="date-description">
                  <p className="date-content">{new Date(meal.deliveryDateTime).toString().substr(0, 15)}</p>
                </div>
              </div>
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

export default connect(mapStateToProps, { fetchMeals, getUserDetails })(MealList);
