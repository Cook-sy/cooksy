import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';

import { differenceBetweenTwoDatesInDays } from '../utils/FormHelper';
import './RequestCard.css';

export default function RequestCard(props) {
  const ordersLeft = props.numOrdered / props.numRequired * 100;
  const countdown = differenceBetweenTwoDatesInDays(props.deadline);
  return (
    <div className="request-card">
      <div className="meal-name">
        <Link to={`/meals/${props.meal.id}`} target="#" >{props.meal.name}</Link>
      </div>
      <Avatar
        src={props.meal.chef.image}
        size={30}
      />
      <span className="created-by">by <b>{props.meal.chef.username}</b></span>
      <p>${props.meal.price}</p>
      <LinearProgress mode="determinate" value={ordersLeft} />
      <div className="request-stat">
        <span className="num-ordered">
          {props.numOrdered} <i className="material-icons cyan">favorite</i>
        </span>
        <span className="num-required">
          {props.numRequired} <i className="material-icons cyan">restaurant</i>
        </span>
      </div>
      <p>Countdown: {countdown} Days</p>
      <div className="request-buttons">
        <RaisedButton
          onClick={() =>
            props.orderRequestedMeal({ num: 1, requestId: props.requestId })}
          label={'Request'}
          backgroundColor="rgb(0, 188, 212)"
          icon={<i className="material-icons white">favorite</i>}
        />
      </div>
    </div>
  );
}
