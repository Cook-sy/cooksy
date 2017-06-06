import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMeals } from '../actions/index';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import './MealList.css';

class Homepage extends Component {

  componentDidMount() {

    let todaysMeals = [];
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
    if (month.length === 1) {
      month = '0' + month;
    }
    let day = today.getDate().toString();
    if (day.length === 1) {
      day = '0' + day;
    }
    const date = year + '-' + month + '-' + day;
    this.props.fetchMeals()
      .then(function(meals) {
        _.map(meals.payload.data, (meal) => {
          if (meal.deliveryDateTime.substr(0, 10) === '2017-08-18') {
            todaysMeals.push(meal);
          }
        })
      })
  }

  fetchAllMeals

  render() {
    return (
      <div className="root">
        <GridList
          cellHeight={180}
          className="grid-list"
        >
          <Subheader>Cooksy</Subheader>
          {_.map(this.props.meals, (meal) => (
            <GridTile
              key={meal.name}
              title={<Link to={`/meals/${meal.id}`} style={{color:'white', textDecoration: 'none'}}>{meal.name}</Link>}
              subtitle={<span>by <b>{meal.chef.username}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <img src={meal.images} alt="meal list"/>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { meals: state.meals };
}

export default connect(mapStateToProps, { fetchMeals: fetchMeals })(Homepage);
