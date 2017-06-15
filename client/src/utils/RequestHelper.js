import _ from 'lodash';

export function attachTokenToTheHeader() {
  const token = localStorage.getItem('cooksy');
  
  return {'x-access-token': `Bearer ${token}`};
}

export function getTopRequests(requests, num = 3) {
  return _.orderBy(requests, ['request.deadline'], ['asc'])
  .slice(0, num);
} 