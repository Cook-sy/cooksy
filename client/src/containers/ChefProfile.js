import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import { Rating } from 'material-ui-rating';
import { fetchMealsByChef } from '../actions/index';

import './ChefProfile.css';

class ChefProfile extends Component {
  componentDidMount() {
    this.props.fetchMealsByChef();
  }

  render() {
    const { meals, chef } = this.props;

    if (!meals || !chef) {
      return <p>Loading.....</p>;
    }

    return (
      <List>
        <ListItem
          disabled={true}
          leftAvatar={<Avatar src={chef.image} size={300} />}
        />
        <div className="chef-info">
          <h3>{chef.name}</h3>
          <Rating value={Math.ceil(chef.rating)} max={5} readOnly={true} />
        </div>
      </List>
    );
  }
}

function mapStateToProps({ meals }) {
  return {
    meals,
    chef: meals[0] && meals[0].chef
  };
}

export default connect(mapStateToProps, { fetchMealsByChef })(ChefProfile);
