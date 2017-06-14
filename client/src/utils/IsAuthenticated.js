export function decodeToken() {
  const token = localStorage.getItem('cooksy');

  if (token) {
    const payload = token.split('.')[1];
    const decodedToken = window.atob(payload);
    return JSON.parse(decodedToken);
  }
}

export function successfulAuth(token) {
  localStorage.setItem('cooksy', token);
  this.props.history.push('/meals');
}

export function deleteToken(tokenKey) {
  localStorage.removeItem(tokenKey);
}