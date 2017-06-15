import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';

import RequestCard from '../components/RequestCard';
import SearchBar from './SearchBar';
import { getUsersRequests, orderRequestedMeal } from '../actions';
import './MealList.css';

class MealList extends Component {
  componentDidMount() {
    this.props.getUsersRequests(1);
  }

  render() {
    const style = { marginRight: 8 };

    return (
      <div className="root">
        <GridList
          cellHeight={180}
          className="grid-list"
        >
          {_.map(this.props.requests, (request) => (
            <RequestCard
              requestId={request.requestId}
              numRequired={request.request.numRequired}
              numOrdered={request.request.numOrdered}
              orderRequestedMeal={this.props.orderRequestedMeal}
              deadline={request.request.deadline}
              meal={request.request.meal}
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

export default connect(mapStateToProps, { getUsersRequests, orderRequestedMeal })(MealList);
