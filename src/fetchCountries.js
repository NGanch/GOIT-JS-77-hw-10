
import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1'

// ====================== 1 HTTP-запит ===================

export function fetchCountries(name) {

    return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if (!response.ok) {
           throw new Error(
            Notiflix.Notify.failure('Oops, there is no country with that name'));
        }
        return response.json();
        
      });
  }

// --------------------------------------------------------


