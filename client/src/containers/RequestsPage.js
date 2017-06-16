import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GridList } from 'material-ui/GridList';
import _ from 'lodash';

import RequestCard from '../components/RequestCard';
import { getAllRequests, orderRequestedMeal } from '../actions';
import './MealList.css';

class RequestsPage extends Component {
  componentDidMount() {
    this.props.getAllRequests();
  }

  render() {
    return (
      <div className="root">
        <GridList
          cellHeight={180}
          className="grid-list"
        >
          {_.map(this.props.requests, (request) => (
            <RequestCard
              key={request.id}
              requestId={request.id}
              numRequired={request.numRequired}
              numOrdered={request.numOrdered}
              orderRequestedMeal={this.props.orderRequestedMeal}
              deadline={request.deadline}
              meal={request.meal}
            />
          ))}
        </GridList>
      </div>
    );
  }
}

function mapStateToProps({ requests }) {
  return {
    requests
  };
}

export default connect(mapStateToProps, { getAllRequests, orderRequestedMeal })(RequestsPage);
