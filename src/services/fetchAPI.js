export const fetchAPI = async (page, endpoint) => {
  try {
    if (page.includes('meals')) {
      const response = await fetch(endpoint);
      const data = await response.json();
      return data.meals || [];
    } if (page.includes('drinks')) {
      const response = await fetch(endpoint);
      const data = await response.json();
      return data.drinks || [];
    }
  } catch (error) {
    console.log(error);
  }
};
