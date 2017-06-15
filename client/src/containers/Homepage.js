import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { Rating } from 'material-ui-rating';
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';

import Carousel from 'nuka-carousel';

import { connect } from 'react-redux';
import { fetchUpcomingMeals, getUsersRequests, orderRequestedMeal } from '../actions';
import HorizontalGrid from '../components/HorizontalGrid';
import MealGridElement from '../components/MealGridElement';
import RequestGridElement from '../components/RequestGridElement';
import { getTopRequests } from '../utils/RequestHelper';
import './Homepage.css';

const styles = {
  smallIcon: {
    width: 16,
    height: 16
  },
  small: {
    width: 36,
    height: 36,
    padding: 6
  },
};

class Homepage extends Component {
  componentDidMount() {
    this.props.getUsersRequests(1)
    this.props.fetchUpcomingMeals();
  }

  render() {
    const { upcomingMeals, requests } = this.props;
    const topRequests = requests && getTopRequests(requests, 3);

    let dates = Object.keys(upcomingMeals).sort(function(a, b) {
      return new Date(a).getTime() - new Date(b).getTime();
    });
    return (
      <div>
        <div className="homepage-hero">
          <div className="homepage-hero-inner">
            <h1 className="homepage-name">Cooksy</h1>

            <div className="homepage-hero-btn">
              <Link to="/nearby-meals">
                <RaisedButton label="Find your next meal" />
              </Link>
            </div>
          </div>
        </div>

        <div className="homepage-meals">
          <h2 className="homepage-upcoming">Hot Requests</h2>

          <div className="homepage-requests">
            { Object.keys(topRequests).length > 0 && _.map(topRequests, (req) => (
                <RequestGridElement
                  gridItem={req}
                  orderRequestedMeal={this.props.orderRequestedMeal}
                />
              ))
            }
          </div>

          <br />

          <h2 className="homepage-upcoming">Upcoming Meals</h2>

          { dates.length !== 0 && _.map(dates, (date) => (
            <div key={date}>
              <span className="homepage-date">
                {moment(new Date(date).toISOString()).format('dddd, MMMM D')}
              </span>

              <div className="homepage-meal-upcoming">
                { _.map(upcomingMeals[date], (meal) => (
                    <Card
                      key={meal.id}
                      className="homepage-meal-item"
                    >
                      <CardHeader
                        title={meal.chef.username}
                        subtitle={`${meal.city}, ${meal.state}`}
                        avatar={meal.chef.image}
                      />

                      <CardMedia>
                        <img
                          className="homepage-meal-item-image"
                          src={meal.images}
                          alt={meal.name}
                          />
                      </CardMedia>

                      <CardTitle
                        title={
                          <Link to={`/meals/${meal.id}`} className="homepage-meal-item-name">
                            {meal.name}
                          </Link>
                        }
                        titleColor="#00bcd4"
                        titleStyle={{ fontSize: 20 }}
                      >
                        <span className="review-rating">
                          <Rating
                            value={Math.ceil(meal.rating)}
                            max={5}
                            readOnly={true}
                            itemStyle={styles.small}
                            itemIconStyle={styles.smallIcon}
                            />
                        </span>
                      </CardTitle>
                    </Card>
                  ))
                }
              </div>
            </div>
            ))
          }
        </div>
      </div>
    );
  };
};

function mapStateToProps({ requests, upcomingMeals }) {
  return {
    upcomingMeals,
    requests
  };
};

export default connect(mapStateToProps, { fetchUpcomingMeals, getUsersRequests, orderRequestedMeal })(Homepage);

// <div key={date}>
//   <p id="date">{new Date(date).toString().substr(0, 15)}</p>
//   <HorizontalGrid gridObject={upcomingMeals[date]} GridComponent={MealGridElement}/>
// </div>

// <div className="root-homepage">
//   <div className="goleft"><h1>Cooksy</h1></div>
//   <Carousel
//     slidesToShow={2}
//     cellAlign="center"
//     cellSpacing={30}
//   >
//     <div className="wrapper">
//       <img className="image" src="https://greatist.com/sites/default/files/SlowCooker-Pork-Ramen_0.jpg" alt="Ramen"/>
//       <div className="description">
//         <p className="content">Eat homecooked meals from real home cooks!</p>
//       </div>
//     </div>
//     <img src="https://static1.squarespace.com/static/53ffb08fe4b0a9868676061c/53ffb0bbe4b006127c1eae3e/53ffcd46e4b0cd9fe3d11696/1409273160709/pasta.jpg" alt="Spaghetti"/>
//     <img src="http://del.h-cdn.co/assets/15/51/1450278988-honey-soy-chicken.jpg" alt="Chicken"/>
//     <img src="https://i1.wp.com/www.jamesandeverett.com/whatscooking/wp-content/uploads/2012/07/beet-salad-1.jpg?ssl=1" alt="Beat Salad"/>
//     <img src="https://halfoff.adspayusa.com/wp-content/uploads/2017/04/sushi_and_sashimi_for_two.0.jpg" alt="Sushi"/>
//     <img src="https://static1.squarespace.com/static/53f3f136e4b0124220e8333e/t/54110606e4b0e5bb93d5efa6/1410401799249/tacos+on+a+tray.jpg" alt="Tacos"/>
//   </Carousel>
//   {dates.length !== 0 && _.map(dates, (date) => (
//     <div>
//       <p id="date">{new Date(date).toString().substr(0, 15)}</p>
//       <HorizontalGrid key={date} meals={this.props.upcomingMeals[date]}/>
//     </div>
//   ))}
// </div>

// <img src="https://static1.squarespace.com/static/53ffb08fe4b0a9868676061c/53ffb0bbe4b006127c1eae3e/53ffcd46e4b0cd9fe3d11696/1409273160709/pasta.jpg" alt="Spaghetti"/>
// <img src="http://del.h-cdn.co/assets/15/51/1450278988-honey-soy-chicken.jpg" alt="Chicken"/>
// <img src="https://i1.wp.com/www.jamesandeverett.com/whatscooking/wp-content/uploads/2012/07/beet-salad-1.jpg?ssl=1" alt="Beat Salad"/>
// <img src="https://halfoff.adspayusa.com/wp-content/uploads/2017/04/sushi_and_sashimi_for_two.0.jpg" alt="Sushi"/>
// <img src="https://static1.squarespace.com/static/53f3f136e4b0124220e8333e/t/54110606e4b0e5bb93d5efa6/1410401799249/tacos+on+a+tray.jpg" alt="Tacos"/>
// </Carousel>
// {Object.keys(topRequests).length > 0 &&
// <HorizontalGrid orderRequestedMeal={this.props.orderRequestedMeal} gridObject={topRequests} GridComponent={RequestGridElement}/>
// }
// <br />
// {dates.length !== 0 && _.map(dates, (date) => (
// <div key={date}>
//   <p id="date">{new Date(date).toString().substr(0, 15)}</p>
//   <HorizontalGrid gridObject={upcomingMeals[date]} GridComponent={MealGridElement}/>
// </div>
// ))}
