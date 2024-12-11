export const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const setAuthData = (token, user) => {
  localStorage.setItem('accessToken', token);
  localStorage.setItem('user', JSON.stringify(user));
}; 