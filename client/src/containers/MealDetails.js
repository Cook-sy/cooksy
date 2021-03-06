import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchMealDetail,
  reviewMeal,
  rateMeal,
  toggleReview,
  didReview,
  postPurchaseDetails
} from '../actions';
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Rating } from 'material-ui-rating';
import moment from 'moment';

import { decodeToken } from '../utils/IsAuthenticated';
import ReviewForm from './ReviewForm';
import MaterialUIDialog from '../components/Dialog';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './MealDetails.css';
import Map from './GoogleMaps';

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

class MealDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      loggedIn: false,
      role: ''
    };

    this.addReview = this.addReview.bind(this);
    this.didReview = this.didReview.bind(this);
    this.visitChefProfile = this.visitChefProfile.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const isLoggedIn = decodeToken();

    if (isLoggedIn) {
      this.setState({ loggedIn: true, role: isLoggedIn.role })
    }

    this.props.fetchMealDetail(id);
  }

  addReview() {
    this.props.toggleReview();
  }

  didReview() {
    this.props.didReview(this.props.currentMeal);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    const quantity = document.getElementById('quantity').value || 1;
    const { id } = this.props.match.params;
    this.setState({open: false});
    this.props.postPurchaseDetails({num: quantity, mealId: id});
  }

  handleCancel() {
    this.setState({open: false});
  }

  visitChefProfile() {
    const chefId = this.props.currentMeal.chef.id;
    this.props.history.push(`/chefs-profile/${chefId}`)
  }

  render() {
    const { currentMeal, review } = this.props;

    if (Object.keys(currentMeal).length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div onLoad={this.didReview} className="details-root">
        <Card className="details-card">
          <CardHeader
            onClick={this.visitChefProfile}
            title={currentMeal.chef.username}
            subtitle="Chef"
            avatar={currentMeal.chef.image}
            style={{cursor: 'pointer'}}
          >
            <p className="details-date-heading pull-right">
              {moment(currentMeal.deliveryDateTime).format('dddd, MMMM D, YYYY')}
            </p>
          </CardHeader>

          <CardMedia>
            <img
              className="details-image"
              src={currentMeal.images}
              alt={currentMeal.name}
            />
          </CardMedia>


          <CardTitle
            title={
              <div>
                {currentMeal.name}
                <span className="pull-right">
                  <RaisedButton 
                    label="Purchase" 
                    primary={true} 
                    onTouchTap={this.handleOpen}
                    disabled={!this.state.loggedIn || this.state.role === 'chef'}
                  />
                  <MaterialUIDialog
                    handleCancel={this.handleCancel}
                    handleOpen={this.handleOpen}
                    handleClose={this.handleClose}
                    title="Please confirm your purchase"
                    isOpen= {this.state.open}
                    price={currentMeal.price}
                  />
                </span>
              </div>
            }
            titleColor="#00bcd4"
            className="details-meal-name"
          >
            <span className="details-meal-rating">
              <Rating value={Math.ceil(currentMeal.rating)} max={5} readOnly={true} />
            </span>
          </CardTitle>

          <CardText className="details-card-text">
            <div className="row">
              <div className="col-sm-8">
                {currentMeal.description}
              </div>

              <div className="col-sm-4">
                <table className="pull-right">
                  <tbody>
                    <tr>
                      <td className="text-right details-info-label">Price:</td>
                      <td className="details-price details-info">${currentMeal.price}</td>
                    </tr>
                    <tr>
                      <td className="text-right details-info-label">Remaining:</td>
                      <td className="details-info">{currentMeal.servings - currentMeal.numOrdered <= 0 ? 0 : currentMeal.servings - currentMeal.numOrdered}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardText>

          <CardTitle
            title="Pickup Information"
            titleStyle={{ fontSize: 20 }}
          />

          <CardText className="details-card-text">
            <div className="row">
              <div className="col-sm-7">
                <table>
                  <tbody>
                    <tr>
                      <td className="text-right details-info-label">Time:</td>
                      <td className="details-datetime">{moment(currentMeal.deliveryDateTime).format('h:mm a')}</td>
                    </tr>
                    <tr>
                      <td className="text-right details-info-label">Date:</td>
                      <td className="details-datetime">{moment(currentMeal.deliveryDateTime).format('dddd, MMMM D, YYYY')}</td>
                    </tr>
                    <tr>
                      <td className="text-right details-info-label">Address:</td>
                      <td className="details-datetime">
                        {`${currentMeal.address}, ${currentMeal.city}, ${currentMeal.state} ${currentMeal.zipcode}`}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p className="details-pickup-extra">
                  {currentMeal.pickupInfo}
                </p>
              </div>

              <div className="col-sm-5">
                <div style={{ width: '100%', height: 250 }}>
                  <Map
                    address={currentMeal.address}
                    city={currentMeal.city}
                    state={currentMeal.state}
                    containerElement={<div style={{ height: '100%' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                  />
                </div>
              </div>
            </div>
          </CardText>
        </Card>

        <Card className="details-card">
          <CardTitle
            title={
              <div>
                Meal Reviews
                <span className="pull-right">
                  { !review.didReview &&
                    <RaisedButton label="Add a review" onClick={this.addReview} />
                  }
                </span>
              </div>}
            titleStyle={{ fontSize: 20 }}
          />

          <CardText className="details-card-text">
            <ReviewForm id={this.props.match.params.id} />

            <div>
              { review.currentReviews.reverse().map(review =>
                  <div key={review.id} className="review">
                    <div className="review-rating">
                      <Rating
                        value={Math.ceil(review.rating)}
                        max={5}
                        readOnly={true}
                        itemStyle={styles.small}
                        itemIconStyle={styles.smallIcon}
                      />
                    </div>
                    <p>
                      <span className="review-title">{review.title}</span>
                      <span className="pull-right review-time">
                        <time title={moment(review.createdAt).format('lll')} dateTime={review.createdAt}>
                          {moment(review.createdAt).fromNow()}
                        </time>
                      </span>
                    </p>
                    <p>{review.review}</p>
                    <p className="reviewer">{review.user.username}</p>
                  </div>
                )
              }
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ review, currentMeal }, ownProps) {
  return {
    currentMeal: currentMeal,
    review: review
  };
}

export default connect(mapStateToProps, {
  fetchMealDetail,
  reviewMeal,
  rateMeal,
  toggleReview,
  didReview,
  postPurchaseDetails
})(MealDetails);
