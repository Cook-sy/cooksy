import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import { Rating } from 'material-ui-rating';

const HorizontalGrid = ({ gridObject, GridComponent }) => {
  return (
    <GridList
      cellHeight={200}
      className="grid"
      cols={2.2}
    >
      {_.map(gridObject, (gridItem) => (
        <GridComponent gridItem={gridItem} />
      ))}
    </GridList>
  );
};

export default HorizontalGrid;
