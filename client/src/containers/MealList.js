import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import { Rating } from 'material-ui-rating';
import { Badge } from 'reactstrap';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
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

    return (
      <div>
        <div className="row">
          <div className="col-md-9 meals-buttons">
            <Link to="/meals">
              <RaisedButton label="ALL Meals" primary={true} />
            </Link>

              <Link className="nearby-button" to="/nearby-meals">
                <RaisedButton label="Nearby Meals" />
              </Link>
          </div>

          <div className="pull-right col-md-3">
            <SearchBar />
          </div>
        </div>

        <GridList
          cellHeight={325}
          className="meal-grid-list"
        >
          {_.map(this.props.meals, (meal) => (
            <GridTile
              key={meal.id}
              title={<Link to={`/meals/${meal.id}`} className="un-linkify" >{meal.name}</Link>}
              subtitle={<Link to={`/chefs-profile/${meal.chef.id}`} target="#" className="un-linkify" >by <b>{meal.chef.username}</b></Link>}
              actionIcon={<Rating value={Math.ceil(meal.rating)} max={5} readOnly={true} />}
            >
                <div className="date-wrapper">
                  <img src={meal.images} alt="meal list"/>

                  <div className="pull-right date-description">
                    <Badge className="date-badge" pill>{moment(meal.deliveryDateTime).format('MMMM D, YYYY')}</Badge>
                  </div>

                  <div className="city-description">
                    <Badge className="city-badge" pill>{meal.city}, {meal.state}</Badge>
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
