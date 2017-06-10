import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import { Rating } from 'material-ui-rating';

const HorizontalGrid = ({ meals }) => {
  return (
    <GridList
      cellHeight={200}
      className="grid"
      cols={2.2}
    >
      {_.map(meals, (meal) => (
        <GridTile
          className="tile"
          key={meal.name}
          title={<Link to={`/meals/${meal.id}`} style={{color:'white', textDecoration: 'none'}}>{meal.name}</Link>}
          subtitle={<span>by <b>{meal.chef.username}</b></span>}
          actionIcon={<Rating value={Math.ceil(meal.rating)} max={5} readOnly={true} />}
        >
          <img src={meal.images} alt={meal.name}/>
        </GridTile>
      ))}
    </GridList>
  );
};

export default HorizontalGrid;