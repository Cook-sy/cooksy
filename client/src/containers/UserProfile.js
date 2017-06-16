import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardMedia,
  CardText
} from 'material-ui/Card';
import _ from 'lodash';
import moment from 'moment';

import { getPurchases } from '../actions/purchaseActions';
import { getUsersRequests, orderRequestedMeal } from '../actions/requestActions';
import RequestCard from '../components/RequestCard';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './UserProfile.css';

class UserProfile extends Component {

  componentDidMount() {
    this.props.getPurchases();
    this.props.getUsersRequests();
  }

  render() {
    const { purchases, requests } = this.props;

    return (
      <div className="user-root">
        <div className="user-requests">
          <h2 className="user-heading">My Requests</h2>

          <div className="user-requests-list">
            { _.map(requests, (request) => (
                <div key={request.id} className="user-request-card">
                  <RequestCard
                    requestId={request.requestId || request.id}
                    numRequired={request.numRequired || request.request.numRequired}
                    numOrdered={request.numOrdered || request.request.numOrdered}
                    orderRequestedMeal={this.props.orderRequestedMeal}
                    deadline={request.deadline || request.request.deadline}
                    meal={request.meal || request.request.meal}
                  />
                </div>
              ))
            }
          </div>
        </div>

        <div className="user-purchases">
          <h2 className="user-heading">My Purchases</h2>

          <div className="user-purchases-list">
            { _.map(_.sortBy(purchases, ['createdAt']), (purchase) => (
                <Card
                  key={purchase.id}
                  className="user-purchase-item"
                >
                  <CardHeader
                    title={purchase.meal.chef.username}
                    subtitle={`${purchase.meal.city}, ${purchase.meal.state}`}
                    avatar={purchase.meal.chef.image}
                  />

                  <CardMedia>
                    <img
                      className="user-purchase-item-image"
                      src={purchase.meal.images}
                      alt={purchase.meal.name}
                    />
                  </CardMedia>

                  <CardText>
                    <Link to={`/meals/${purchase.meal.id}`} className="user-purchase-item-name">
                      {purchase.meal.name}
                    </Link>

                    <table>
                      <tbody>
                        <tr>
                          <td className="text-right user-purchase-details-info-label">Order Date:</td>
                          <td className="user-purchase-details-info">
                            {moment(purchase.createdAt).format('MMMM D, YYYY')}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-right user-purchase-details-info-label">Price:</td>
                          <td className="user-purchase-details-info">${purchase.individualPrice}</td>
                        </tr>
                        <tr>
                          <td className="text-right user-purchase-details-info-label">Quantity:</td>
                          <td className="user-purchase-details-info">{purchase.num}</td>
                        </tr>
                        <tr>
                          <td className="text-right user-purchase-details-info-label">Total:</td>
                          <td className="user-purchase-details-info user-purchase-highlight">${purchase.individualPrice * purchase.num}</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardText>
                </Card>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ purchase, requests }) {
  return {
    purchases: purchase,
    requests: requests
  };
}

export default connect(mapStateToProps, { getPurchases, getUsersRequests, orderRequestedMeal })(UserProfile);
