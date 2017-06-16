import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
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

    if ( Object.keys(requests).length === 0 || Object.keys(requests).length === 0) {
      return <div>loadding....</div>;
    }

    return (
      <div className="user-root">
        <div className="user-requests">
          <h2 className="user-heading">My Requests</h2>

          <div className="user-requests-list">
            { _.map(requests, (request) => (
                <div className="user-request-card">
                  <RequestCard
                    requestId={request.requestId}
                    numRequired={request.request.numRequired}
                    numOrdered={request.request.numOrdered}
                    orderRequestedMeal={this.props.orderRequestedMeal}
                    deadline={request.request.deadline}
                    meal={request.request.meal}
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


// <div className="col">
//   <h1 className="purchase-title">Purchase History</h1>
//   {_.map(purchase, (purchase) => (
//     <Card
//       key={purchase.id}
//       className="card">
//       <CardTitle
//         showExpandableButton={true}
//         title={<Link to={`/meals/${purchase.meal.id}`} style={{color:'blue', textDecoration: 'none'}}>{purchase.meal.name}, {new Date(purchase.createdAt).toString().substr(4, 11)}</Link>}
//         subtitle={<span>by <b>{purchase.meal.chef.username}</b></span>}
//       >
//         <p>${purchase.individualPrice}<br/>
//           Quantity ordered: {purchase.num}<br/>
//           Total: ${purchase.individualPrice * purchase.num}
//         </p>
//         <img className="purchase-images" src={purchase.meal.images} alt={purchase.meal.name} />
//       </CardTitle>
//       <CardText actAsExpander={true}>
//       </CardText>
//       <CardText expandable={true}>
//         <p><strong>Pick up info:</strong><br/>
//           {new Date(purchase.meal.deliveryDateTime).toString().substr(4, 11)}<br/>
//           {new Date(purchase.meal.deliveryDateTime).toLocaleTimeString()}<br/>
//           {purchase.meal.pickupInfo}
//         </p>
//         <p>{purchase.meal.address}<br/>
//           {purchase.meal.city}, {purchase.meal.state} {purchase.meal.zipcode}
//         </p>
//       </CardText>
//     </Card>
//   ))}
// </div>
// <div className="col">
//   <h1 className="purchase-title">Requests</h1>
//   <div>
//   <Card className="card">
//     {_.map(requests, (request) => (
//       <Card key={request.requestId} >
//         <RequestCard
//           requestId={request.requestId}
//           numRequired={request.request.numRequired}
//           numOrdered={request.request.numOrdered}
//           orderRequestedMeal={this.props.orderRequestedMeal}
//           deadline={request.request.deadline}
//           meal={request.request.meal}
//         />
//       </Card>
//     ))}
//   </Card>
//   </div>
// </div>
