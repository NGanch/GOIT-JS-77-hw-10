import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const fetchInput = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');


fetchInput.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY))
 // -----------------handleInput---------------------
function handleInput(event) {
  const searchCountries = event.target.value.trim(); 

    if (!searchCountries) {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      return;
    }
    fetchCountries(searchCountries)
      .then(choiceCountry)
      .catch(error => console.log(error));
}
// ----------------choiceCountry------------------------
  function choiceCountry(countries) {
    const country = countries.length;
    if (country > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      return;
    }
    if (country === 1) {
      countryList.innerHTML = '';
      return renderOneCountryInfo(countries);
    }
    if (country > 1) {
      countryInfo.innerHTML = '';
      return renderManyCountryList(countries);
    }
  }
  // ----------------renderOneCountryInfo------------------
  function renderOneCountryInfo(arr) {

    let createOneCountryInfo = arr.map(({ name, capital, population, flags, languages}) => {
    return `<li class="item-list">
    <div class="item-div">
    <img src = "${flags.svg}" alt = "flag of${name.official}" class= "img" width="50px" height="30">
    <h2 class="country-title">${name.official}</h2>
    </div>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages)}</p>

      </li>`;
      })
      .join("");
      countryInfo.innerHTML = createOneCountryInfo;
  }
  // ----------------renderManyCountryList------------------
  function renderManyCountryList(arr) {
    let createManyCountryList = arr.map(({ name, flags }) => {
    return `<li class="item-list">
    <div class="item-div">
    <img src = "${flags.svg}" alt = "flag of ${name.official}" class= "img" width="50px" height="30">
    <p class="country-title">${name.official}</p></li>
    </div>`;
    })
    .join("");
    countryList.innerHTML = createManyCountryList;
}