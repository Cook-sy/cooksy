import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import { Rating } from 'material-ui-rating';
import _ from 'lodash';

import { getPurchases } from '../actions/purchaseActions';

class UserProfile extends Component {

  componentDidMount() {

    console.log(this.props.getPurchases());

  }

  render() {
    return (
      <div>
        <GridList
          cellHeight={180}
          className="grid-list"
        >
          <Subheader>Purchases</Subheader>
          {_.map(this.props.purchase, (purchase) => (
            <GridTile
              key={purchase.id}
              title={<Link to={`/meals/${purchase.meal.id}`} style={{color:'white', textDecoration: 'none'}}>{purchase.meal.name}<br/>${purchase.individualPrice}</Link>}
              subtitle={<span>by <b>{purchase.meal.chef.username}</b></span>}
              actionIcon={<Rating value={Math.ceil(purchase.meal.rating)} max={5} readOnly={true} />}
            >
              <img src={purchase.meal.images} alt={purchase.meal.name}/>
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    purchase: state.purchase
  };
}

export default connect(mapStateToProps, { getPurchases })(UserProfile);
