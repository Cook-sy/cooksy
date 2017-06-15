import React from 'react';

import RequestCard from './RequestCard';

const RequestGridElement = function({ gridItem, orderRequestedMeal }) {
  return (
    <RequestCard
      requestId={gridItem.requestId}
      numRequired={gridItem.request.numRequired}
      numOrdered={gridItem.request.numOrdered}
      orderRequestedMeal={orderRequestedMeal}
      deadline={gridItem.request.deadline}
      meal={gridItem.request.meal}
    />
  );
}

export default RequestGridElement;