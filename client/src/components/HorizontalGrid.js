import React from 'react';
import _ from 'lodash';
import { GridList } from 'material-ui/GridList';

const HorizontalGrid = ({ gridObject, GridComponent, ...rest }) => {
  return (
    <GridList
      cellHeight={200}
      className="grid"
      cols={2.2}
    >
      {_.map(gridObject, (gridItem) => (
        <GridComponent gridItem={gridItem} {...rest} />
      ))}
    </GridList>
  );
};

export default HorizontalGrid;
