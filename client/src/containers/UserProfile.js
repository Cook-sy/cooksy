import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import { Rating } from 'material-ui-rating';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import _ from 'lodash';

import { getPurchases } from '../actions/purchaseActions';
import './UserProfile.css';

class UserProfile extends Component {

  componentDidMount() {

    this.props.getPurchases();

  }

  render() {
    return (
      <div>
        {_.map(this.props.purchase, (purchase) => (
          <Card className="card">
            <CardTitle
              actAsExpander={true}
              showExpandableButton={true}
              title={new Date(purchase.createdAt).toString().substr(4, 11)}
              subtitle="Purchase Date"
            />
            <CardText>
              <p>${purchase.individualPrice}</p>
              <p>Quantity ordered: {purchase.num}</p>
              <p><strong>Pick up info:</strong><br/>{new Date(purchase.meal.deliveryDateTime).toString().substr(4, 11)}<br/>{new Date(purchase.meal.deliveryDateTime).toLocaleTimeString()}<br/>{purchase.meal.pickupInfo}</p>
            </CardText>
            <CardMedia
              expandable={true}
              overlay={<CardTitle title={<Link to={`/meals/${purchase.meal.id}`} style={{color:'white', textDecoration: 'none'}}>{purchase.meal.name}</Link>}
              subtitle={<span>by <b>{purchase.meal.chef.username}</b></span>} />}
            >
              <img src={purchase.meal.images} alt={purchase.meal.name} />
            </CardMedia>
          </Card>
        ))}
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
