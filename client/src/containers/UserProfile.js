import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardTitle,
  CardText
} from 'material-ui/Card';
import _ from 'lodash';

import { getPurchases } from '../actions/purchaseActions';
import { getUsersRequests, orderRequestedMeal } from '../actions/requestActions';
import RequestCard from '../components/RequestCard';
import './UserProfile.css';

class UserProfile extends Component {

  componentDidMount() {
    this.props.getPurchases();
    this.props.getUsersRequests();
  }

  render() {
    const { purchase, requests } = this.props;

    if ( Object.keys(requests).length === 0 || Object.keys(requests).length === 0) {
      return <div>loadding....</div>;
    }

    return (
      <div className="flex-grid">
        <div className="col">
          <h1 className="purchase-title">Purchase History</h1>
          {_.map(purchase, (purchase) => (
            <Card
              key={purchase.id}
              className="card">
              <CardTitle
                showExpandableButton={true}
                title={<Link to={`/meals/${purchase.meal.id}`} style={{color:'blue', textDecoration: 'none'}}>{purchase.meal.name}, {new Date(purchase.createdAt).toString().substr(4, 11)}</Link>}
                subtitle={<span>by <b>{purchase.meal.chef.username}</b></span>}
              >
                <p>${purchase.individualPrice}<br/>
                  Quantity ordered: {purchase.num}<br/>
                  Total: ${purchase.individualPrice * purchase.num}
                </p>
                <img className="purchase-images" src={purchase.meal.images} alt={purchase.meal.name} />
              </CardTitle>
              <CardText actAsExpander={true}>
              </CardText>
              <CardText expandable={true}>
                <p><strong>Pick up info:</strong><br/>
                  {new Date(purchase.meal.deliveryDateTime).toString().substr(4, 11)}<br/>
                  {new Date(purchase.meal.deliveryDateTime).toLocaleTimeString()}<br/>
                  {purchase.meal.pickupInfo}
                </p>
                <p>{purchase.meal.address}<br/>
                  {purchase.meal.city}, {purchase.meal.state} {purchase.meal.zipcode}
                </p>
              </CardText>
            </Card>
          ))}
        </div>
        <div className="col">
          <h1 className="purchase-title">Requests</h1>
          <div>
          <Card className="card">
            {_.map(requests, (request) => (
              <Card key={request.requestId} >
                <RequestCard
                  requestId={request.requestId}
                  numRequired={request.request.numRequired}
                  numOrdered={request.request.numOrdered}
                  orderRequestedMeal={this.props.orderRequestedMeal}
                  deadline={request.request.deadline}
                  meal={request.request.meal}
                />
              </Card>
            ))}
          </Card>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ purchase, requests }) {
  return {
    purchase: purchase,
    requests: requests
  };
}

export default connect(mapStateToProps, { getPurchases, getUsersRequests, orderRequestedMeal })(UserProfile);
