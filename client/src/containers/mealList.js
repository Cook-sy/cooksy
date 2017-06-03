import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMeals } from '../actions/index';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

class MealList extends Component {
  componentDidMount() {
    this.props.fetchMeals();
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
          <Subheader>List of Meals</Subheader>
          {_.map(this.props.meals, (meal) => {
            return (
            <GridTile
              key={meal.name}
              title={<Link to={`/meals/${meal.id}`} style={{color:"white", textDecoration: "none"}}>{meal.name}</Link>}
              subtitle={<span>by <b>{meal.chef.username}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <img src={meal.images} alt="meal list"/>
            </GridTile>
          )})}
        </GridList>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { meals: state.meals };
}

export default connect(mapStateToProps, { fetchMeals: fetchMeals })(MealList);
