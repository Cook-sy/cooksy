import React, { Component } from 'react';
import _ from 'lodash';

import Carousel from 'nuka-carousel';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import { Rating } from 'material-ui-rating';

import { connect } from 'react-redux';
import { fetchUpcomingMeals } from '../actions/index';
import HorizontalGrid from '../components/HorizontalGrid'

import './Homepage.css';


class Homepage extends Component {
  componentDidMount() {

    this.props.fetchUpcomingMeals();

  }

  render() {
    let dates = Object.keys(this.props.upcomingMeals).sort(function(a, b) {
      return new Date(a).getTime() - new Date(b).getTime();
    });
    return (
      <div className="root-homepage">
        <div className="goleft"><h1>Cooksy</h1></div>
        <Carousel
          slidesToShow={2}
          cellAlign="center"
          cellSpacing={30}
        >
          <div className="wrapper">
            <img className="image" src="https://greatist.com/sites/default/files/SlowCooker-Pork-Ramen_0.jpg"/>
            <div className="description">
              <p className="content">Eat homecooked meals from real home cooks!</p>
            </div>
          </div>
          <img src="https://static1.squarespace.com/static/53ffb08fe4b0a9868676061c/53ffb0bbe4b006127c1eae3e/53ffcd46e4b0cd9fe3d11696/1409273160709/pasta.jpg"/>
          <img src="http://del.h-cdn.co/assets/15/51/1450278988-honey-soy-chicken.jpg"/>
          <img src="https://i1.wp.com/www.jamesandeverett.com/whatscooking/wp-content/uploads/2012/07/beet-salad-1.jpg?ssl=1"/>
          <img src="https://halfoff.adspayusa.com/wp-content/uploads/2017/04/sushi_and_sashimi_for_two.0.jpg"/>
          <img src="https://static1.squarespace.com/static/53f3f136e4b0124220e8333e/t/54110606e4b0e5bb93d5efa6/1410401799249/tacos+on+a+tray.jpg"/>
        </Carousel>
        {dates.length !== 0 && _.map(dates, (date) => (
          <div>
            <p id="date">{new Date(date).toString().substr(0, 15)}</p>
            <HorizontalGrid key={date} meals={this.props.upcomingMeals[date]}/>
          </div>
        ))}
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    upcomingMeals: state.upcomingMeals
  };
};


export default connect(mapStateToProps, { fetchUpcomingMeals })(Homepage);
