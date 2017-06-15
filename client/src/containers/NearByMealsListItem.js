import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Media } from 'react-bootstrap';
import Avatar from 'material-ui/Avatar';
import { Rating } from 'material-ui-rating';
import Truncate from 'react-truncate';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './NearByMeals.css';

const styles = {
  smallIcon: {
    width: 12,
    height: 12
  },
  small: {
    width: 24,
    height: 24,
    padding: 4
  },
};

class NearByMealsListItem extends Component {
  render() {
    const {
      className,
      meal,
      markers,
      handleMarkerClick,
      handleMarkerOver,
      handleMarkerOut
    } = this.props;

    const renderReadMore = (mealId) => (
      <span>
        ...
        <Link to={`/meals/${mealId}`}>Read more</Link>
      </span>
    );

    return (
      <Media.ListItem className={className}>
        <Media
          onClick={() => handleMarkerClick(markers.find(marker => marker.id === meal.id))}
          onMouseEnter={() => handleMarkerOver(markers.find(marker => marker.id === meal.id))}
          onMouseLeave={() => handleMarkerOut(markers.find(marker => marker.id === meal.id))}
        >
          <Media.Body>
            <Media.Heading>
              <Link
                to={`/meals/${meal.id}`}
                className="NearByMeals-meal-heading"
              >
                {meal.name}
              </Link>

              <span className="pull-right NearByMeals-meal-date">
                {moment(meal.deliveryDateTime).format('MMMM D, YYYY')}
              </span>
            </Media.Heading>

            <span>
              <Rating
                value={Math.ceil(meal.rating)}
                max={5}
                readOnly={true}
                itemStyle={styles.small}
                itemIconStyle={styles.smallIcon}
                style={{ display: 'inline' }}
              />

              <span className="pull-right NearByMeals-meal-price">
                ${meal.price}
              </span>
            </span>

            <Media className="NearByMeals-meal-aux">
              <Media.Left>
                <Avatar
                   src={meal.chef.image}
                   size={30}
                 />
              </Media.Left>

              <Media.Body>
                <span className="NearByMeals-meal-chef">
                  {meal.chef.username}
                </span>

                <p className="NearByMeals-meal-address">
                  {`${meal.address}, ${meal.city}`}
                </p>
              </Media.Body>
            </Media>

            <Truncate
              className="NearByMeals-meal-desc"
              lines={2}
              ellipsis={renderReadMore(meal.id)}
            >
              {meal.description}
            </Truncate>
          </Media.Body>

          <Media.Right>
            <img
              className="img-rounded"
              src={meal.images}
              width="96"
              alt={meal.name}
            />
          </Media.Right>
        </Media>
      </Media.ListItem>
    );
  }
}

export default NearByMealsListItem;
