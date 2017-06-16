import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import RequestCard from '../components/RequestCard';
import { getAllRequests, orderRequestedMeal } from '../actions';
import './UserProfile.css';

class MealList extends Component {
  componentDidMount() {
    this.props.getAllRequests();
  }

  render() {
    return (
      <div className="user-root">
        <div className="user-requests">
          <h2 className="user-heading">All Requests</h2>

          <div className="user-requests-list">
            { _.map(this.props.requests, (request) => (
                <div key={request.id} className="user-request-card">
                  <RequestCard
                    requestId={request.id}
                    numRequired={request.numRequired}
                    numOrdered={request.numOrdered}
                    orderRequestedMeal={this.props.orderRequestedMeal}
                    deadline={request.deadline}
                    meal={request.meal}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ requests }) {
  return {
    requests
  };
}

export default connect(mapStateToProps, { getAllRequests, orderRequestedMeal })(MealList);
