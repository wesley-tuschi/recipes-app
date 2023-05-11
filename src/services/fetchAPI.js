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

export const fetchRecipes = async (page, endpoint) => {
  try {
    if (page.includes('meals')) {
      const response = await fetch(endpoint);
      const data = await response.json();
      return data || [];
    }

    if (page.includes('drinks')) {
      const response = await fetch(endpoint);
      const data = await response.json(endpoint);
      return data || [];
    }
  } catch (error) {
    console.log(error);
  }
};
