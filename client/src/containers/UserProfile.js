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
import './UserProfile.css';

class UserProfile extends Component {

  componentDidMount() {
    this.props.getPurchases();
  }

  render() {
    return (
      <div className="flex-grid">
        <div className="col">
          <h1 className="purchase-title">Purchase History</h1>
          {_.map(this.props.purchase, (purchase) => (
            <Card
              key={purchase.id}
              className="purchase-card">
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
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    purchase: state.purchase
  };
}

export default connect(mapStateToProps, { getPurchases })(UserProfile);
