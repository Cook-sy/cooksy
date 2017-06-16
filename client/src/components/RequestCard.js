import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';

import MaterialUIDialog from '../components/Dialog';
import { differenceBetweenTwoDatesInDays } from '../utils/FormHelper';
import { decodeToken } from '../utils/IsAuthenticated';
import './RequestCard.css';

export default class RequestCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      loggedIn: false,
      role: ""
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const isLoggedIn = decodeToken();
    if (isLoggedIn) {
      this.setState({ loggedIn: true, role: isLoggedIn.role })
    }
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    const num = document.getElementById('quantity').value || 1;
    const requestId = this.props.requestId;

    this.props.orderRequestedMeal({ num, requestId });
    this.setState({ open: false });
  }

  handleCancel() {
    this.setState({ open: false });
  }

  render() {
    const { numOrdered, numRequired, deadline, meal } = this.props;
    const ordersLeft = numOrdered / numRequired * 100;
    const countdown = differenceBetweenTwoDatesInDays(deadline);

    if (!meal) {
      return <div>Loading...</div>;
    }

    return (
      <div className="request-card">
        <div className="meal-name">
          <Link to={`/meals/${meal.id}`} target="#">{meal.name}</Link>
        </div>
        <Link to={`/chefs-profile/${meal.chef.id}`} target="#" >
          <Avatar src={meal.chef.image} size={30} />
        </Link>
        <span className="created-by">by <b>{meal.chef.username}</b></span>
        <p>${meal.price}</p>
        <LinearProgress mode="determinate" value={ordersLeft} />
        <div className="request-stat">
          <span className="num-ordered">
            {numOrdered} <i className="material-icons cyan">favorite</i>
          </span>
          <span className="num-required">
            {numRequired} <i className="material-icons cyan">restaurant</i>
          </span>
        </div>
        <p>Countdown: {countdown} Days</p>
        <div className="request-buttons">
          <RaisedButton
            onTouchTap={this.handleOpen}
            label={'Request'}
            backgroundColor="rgb(0, 188, 212)"
            icon={<i className="material-icons white">favorite</i>}
            disabled={!this.state.loggedIn || this.state.role === 'chef'}
            title={!this.state.loggedIn && "Please login/signup"}
          />
          <MaterialUIDialog
            handleCancel={this.handleCancel}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
            title="Please confirm your purchase"
            isOpen={this.state.open}
            price={meal.price}
          />
        </div>
      </div>
    );
  }
}
