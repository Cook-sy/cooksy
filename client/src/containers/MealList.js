import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
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

const styles = {
  smallIcon: {
    width: 20,
    height: 20
  },
  small: {
    width: 30,
    height: 30,
    padding: 6
  },
};

class MealList extends Component {
  componentDidMount() {
    console.log(this.props.fetchMeals());
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
        <div className="all-meals">
          {_.map(this.props.meals, (meal) => (
            <Card
              key={meal.id}
              className="meals-card"
            >
              <CardHeader
                title={meal.chef.username}
                subtitle={<span>{meal.city}, {meal.state}</span>}
                avatar={meal.chef.image}
              />
              <CardMedia>
                <img src={meal.images} alt={meal.name} />
              </CardMedia>

              <CardText>
                <p className="meals-name">{meal.name}</p>
                <Rating
                  value={Math.ceil(meal.rating)}
                  max={5}
                  readOnly={true}
                  itemStyle={styles.small}
                  itemIconStyle={styles.smallIcon}
                />
                <p className="meals-date">{moment(meal.deliveryDateTime).format('dddd, MMMM D, YYYY')}</p>
              </CardText>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

/*
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
*/

function mapStateToProps({ meals, auth: { user } }) {
  return {
    meals: meals,
    user: user
  };
}

export default connect(mapStateToProps, { fetchMeals, getUserDetails })(MealList);
