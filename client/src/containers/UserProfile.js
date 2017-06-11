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

    console.log(this.props.getPurchases());

  }

  render() {
    return (
      <div>
        {_.map(this.props.purchase, (purchase) => (
          <Card className="card">
            <CardTitle
              actAsExpander={true}
              showExpandableButton={true}
              title={<Link to={`/meals/${purchase.meal.id}`} style={{color:'black', textDecoration: 'none'}}>{purchase.meal.name}<br/>{new Date(purchase.createdAt).toString().substr(4, 11)}</Link>}
              subtitle={<span>by <b>{purchase.meal.chef.username}</b></span>}
            >
              <p>${purchase.individualPrice}</p>
              <p>Quantity ordered: {purchase.num}</p>
              <p>Total: ${purchase.individualPrice * purchase.num}</p>
            </CardTitle>
            <CardText expandable={true}>
              <p><strong>Pick up info:</strong><br/>{new Date(purchase.meal.deliveryDateTime).toString().substr(4, 11)}<br/>{new Date(purchase.meal.deliveryDateTime).toLocaleTimeString()}<br/>{purchase.meal.pickupInfo}</p>
              <p>{purchase.meal.address}<br/>{purchase.meal.city}, {purchase.meal.state} {purchase.meal.zipcode}</p>
              <img className="purchase" src={purchase.meal.images} alt={purchase.meal.name} />
            </CardText>
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
