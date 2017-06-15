import React from 'react';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import { Rating } from 'material-ui-rating';

const MealGridElement = function({ gridItem }) {
  return (
  <GridTile
    className="tile"
    key={gridItem.name}
    title={<Link to={`/meals/${gridItem.id}`} style={{color:'white', textDecoration: 'none'}}>{gridItem.name}</Link>}
    subtitle={<span>by <b>{gridItem.chef.username}</b></span>}
    actionIcon={<Rating value={Math.ceil(gridItem.rating)} max={5} readOnly={true} />}
  >
    <img src={gridItem.images} alt={gridItem.name}/>
  </GridTile>);
}

export default MealGridElement;