export const userLocalStorage = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};
