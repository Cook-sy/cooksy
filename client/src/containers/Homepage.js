import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTodaysMeals } from '../actions/index';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import _ from 'lodash';

import './Homepage.css';


class Homepage extends Component {
  componentDidMount() {
    console.log(this.props.fetchTodaysMeals());
  }

  render() {
    return (
      <div className="root-homepage">
        <h2>{new Date().toDateString()}</h2>
        <GridList
          cellHeight={180}
          className="grid"
          cols={4}
        >
          {_.map(this.props.todaysMeals, (meal) => (
            <GridTile
              key={meal.name}
              title={<Link to={`/meals/${meal.id}`} style={{color:'white', textDecoration: 'none'}}>{meal.name}</Link>}
              subtitle={<span>by <b>{meal.chef.username}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <img src={meal.images} alt="picture"/>
            </GridTile>
          ))}
        </GridList>
      </div>


    );
  }
}

function mapStateToProps(state) {
  return { todaysMeals: state.todaysMeals };
}


export default connect(mapStateToProps, { fetchTodaysMeals: fetchTodaysMeals })(Homepage);
