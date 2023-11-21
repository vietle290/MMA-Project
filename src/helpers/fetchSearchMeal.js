import axios from 'axios';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php';

const fetchMeals = async (searchTerm) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        s: searchTerm,
      },
    });
    // The response.data object contains the API response.
    return response.data;
  } catch (error) {
    console.error('Error fetching meals:', error);
    return null;
  }
};

export default fetchMeals;
