import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import { Rating } from 'material-ui-rating';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import _ from 'lodash';

import { getPurchases } from '../actions/purchaseActions';
import './UserProfile.css';

class UserProfile extends Component {

  componentDidMount() {

    console.log(this.props.getPurchases());

  }

  render() {
    return (
      <div className="flex-grid">
        <div className="col">
          <h1 className="purchase-title">Purchase History</h1>
          {_.map(this.props.purchase, (purchase) => (
            <Card className="purchase-card">
              <CardTitle
                actAsExpander={true}
                showExpandableButton={true}
                title={<p>{purchase.meal.name}, {new Date(purchase.createdAt).toString().substr(4, 11)}</p>}
                subtitle={<span>by <b>{purchase.meal.chef.username}</b></span>}
              >
                <p>${purchase.individualPrice}<br/>
                  Quantity ordered: {purchase.num}<br/>
                  Total: ${purchase.individualPrice * purchase.num}
                </p>
                <img className="purchase-images" src={purchase.meal.images} alt={purchase.meal.name} />
              </CardTitle>
              <CardText expandable={true}>
                <p><strong>Pick up info:</strong><br/>{new Date(purchase.meal.deliveryDateTime).toString().substr(4, 11)}<br/>{new Date(purchase.meal.deliveryDateTime).toLocaleTimeString()}<br/>{purchase.meal.pickupInfo}</p>
                <p>{purchase.meal.address}<br/>{purchase.meal.city}, {purchase.meal.state} {purchase.meal.zipcode}</p>
                <CardTitle
                  title={<Link to={`/meals/${purchase.meal.id}`} style={{color:'blue', textDecoration: 'none'}}>Veiw Meal Details</Link>}/>
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
