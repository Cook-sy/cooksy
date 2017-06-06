import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTodaysMeals } from '../actions/index';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import './MealList.css';

class Homepage extends Component {

  componentDidMount() {
    this.props.fetchTodaysMeals();
  }

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

export default connect(mapStateToProps, { fetchTodaysMeals: fetchTodaysMeals })(Homepage);
