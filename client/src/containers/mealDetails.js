import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMealDetail } from '../actions/index';
import { Link } from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class MealDetails extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchMealDetail(id);
  }

  render() {
    const { meal } = this.props;

    if (!meal) {
      return <div>Loading...</div>;
    }

    return (
      <div>
      <Card>
        <CardHeader
          title="JORV"
          subtitle="Chef"
          avatar="http://www.ssrfanatic.com/forum/attachments/f6/68324d1235842541-funniest-avatar-troll-baby.jpg"
        />
        <CardMedia
          overlay={<CardTitle title={this.props.meal.name} subtitle="by JORV" />}
        >
          <img src={this.props.meal.images} width="500" height="500"/>
        </CardMedia>
        <CardTitle title="Meal Details" subtitle="Description"/>
        <CardText>
          {this.props.meal.description}
        </CardText>
        <CardTitle subtitle="Pickup Information"/>
        <CardText>
          {this.props.meal.pickupInfo}
        </CardText>
        <CardActions>
          <FlatButton label="Purchase" />
          <FlatButton label={<Link to={"/meals"}>Back To Meals</Link>} />
        </CardActions>
      </Card>
      </div>
    );
  }
}

function mapStateToProps({ meals }, ownProps) {
  return { meal: meals[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchMealDetail })(MealDetails);
