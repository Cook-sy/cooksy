import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTodaysMeals } from '../actions/index';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import { Rating } from 'material-ui-rating';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Carousel from 'react-responsive-carousel/lib/components/Carousel';
import _ from 'lodash';

import './Homepage.css';


class Homepage extends Component {
  componentDidMount() {
    this.props.fetchTodaysMeals();
  }

  render() {
    return (
      <div className="root-homepage">
         <Carousel axis="horizontal" showThumbs={true} showArrows={true}>
            <div>
                <img src="https://www.organicfacts.net/wp-content/uploads/2013/05/Carrot1.jpg" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src="https://www.organicfacts.net/wp-content/uploads/2013/05/Carrot1.jpg" />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src="https://www.organicfacts.net/wp-content/uploads/2013/05/Carrot1.jpg" />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>

        <h2>{new Date().toDateString()}</h2>
        <GridList
          cellHeight={200}
          className="grid"
          cols={2.2}
        >
          {_.map(this.props.todaysMeals, (meal) => (
            <GridTile
              key={meal.name}
              title={<Link to={`/meals/${meal.id}`} style={{color:'white', textDecoration: 'none'}}>{meal.name}</Link>}
              subtitle={<span>by <b>{meal.chef.username}</b></span>}
              actionIcon={<Rating value={Math.ceil(meal.rating)} max={5} readOnly={true} />}
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
