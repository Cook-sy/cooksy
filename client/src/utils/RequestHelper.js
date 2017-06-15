import _ from 'lodash';

export function attachTokenToTheHeader() {
  const token = localStorage.getItem('cooksy');
  
  return {'x-access-token': `Bearer ${token}`};
}

export function getTopRequests(requests, num = 3, category = 'request.deadline') {
  return _.orderBy(requests, [category], ['asc'])
  .slice(0, num);
} 