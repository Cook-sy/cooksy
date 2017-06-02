export function attachTokenToTheHeader() {
  const token = localStorage.getItem('cooksy');
  return {'x-access-token': `Bearer ${token}`};
}