import axios from 'axios';

function fetchCountries(searchQuery) {
  axios.defaults.baseURL = 'https://restcountries.eu/rest/v2';
  return axios.get(`/name/${searchQuery}`).then(response => response.data);
}

export default fetchCountries;
