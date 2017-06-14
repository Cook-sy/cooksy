import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import { Rating } from 'material-ui-rating';
import { fetchMealsByChef } from '../actions/index';
import HorizontalGrid from '../components/HorizontalGrid';
import RaisedButton from 'material-ui/RaisedButton';

import './ChefProfile.css';


class ChefProfile extends Component {
  componentDidMount() {
    this.props.fetchMealsByChef();
  }

  render() {
    const { meals, chef } = this.props;
    {console.log(this.props.meals)}
    if (!meals) {
      return <p>Loading.....</p>;
    }
    let dates = Object.keys(this.props.meals).sort(function(a, b) {
      return new Date(a).getTime() - new Date(b).getTime();
    });
    return (
      <div>
        <List>
          <ListItem
            disabled={true}
            leftAvatar={<Avatar src={'http://www.onegoodshare.com/wp-content/uploads/miley-cyrus-funny-face.jpeg'} size={300} />}
          />
          <div className="chef-info">
            <h3>{'chef'}</h3>
            <Rating value={Math.ceil(4)} max={5} readOnly={true} />
            <RaisedButton className="request" label="Request a Meal" primary={true} />
          </div>
        </List>
        <div className="mealscontainer">
          <h2>Meal History</h2>
          {dates.length !== 0 && _.map(dates, (date) => (
            <div>
              <p id="date">{new Date(date).toString().substr(0, 15)}</p>
              <HorizontalGrid key={date} meals={this.props.meals[date]}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ meals }) {
  return {
    meals: meals,
    chef: meals[0] && meals[0].chef
  };
}

export default connect(mapStateToProps, { fetchMealsByChef })(ChefProfile);
