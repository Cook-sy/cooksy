import React from 'react';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import { Rating } from 'material-ui-rating';

import RequestCard from './RequestCard';

const RequestGridElement = function({ gridItem }) {
  return (
    <RequestCard
      requestId={gridItem.requestId}
      numRequired={gridItem.request.numRequired}
      numOrdered={gridItem.request.numOrdered}
      
      deadline={gridItem.request.deadline}
      meal={gridItem.request.meal}
    />
  );
}

export default RequestGridElement;