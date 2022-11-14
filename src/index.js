import './css/styles.css';
// import debounce from 'lodash.debounce';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countryListContainer = document.querySelector('.country-list');
const countryInfoContainer = document.querySelector('.country-info');

searchInput.addEventListener(
  'input',
  debounce(e => {
    fetchCountries(`${e.currentTarget.value}`);
  }),
  300
);

const fetchCountries = function (name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => response.json())
    .then(countries => {
      console.log(countries);
      return renderCountryList(countries);
    })
    .catch(error => console.log(error));
};

// fetchCountries('peru');

function renderCountryList(countries) {
  let markup = '';

  if (countries.length > 10) {
    return alert('os');
  } else if (countries.length >= 2 && countries.length <= 10) {
    markup = countries
      .map(({ name, flags }) => {
        return `<li class='country-list__item'>
      <img src="${flags.svg}" alt="${name.official}" width='40'>
      ${name.official}</li>`;
      })
      .join('');
  } else {
    markup = countries
      .map(({ name, flags, capital, population, languages }) => {
        return `<div class="country-info__wrap">
        <img src="${flags.svg}" alt="${name.official}" width="40" class='img'/>
        <h2 class="country-info__name">${name.official}</h2>
      </div>
      <ul class="country-info__list">
        <li class="country-info__item">
          Capital: <span class="country-info__item-value">${capital}</span>
        </li>
        <li class="country-info__item">
          Population: <span class="country-info__item-value">${population}</span>
        </li>
        <li class="country-info__item"> Languages: <span class="country-info__item-value lang">${Object.values(
          languages
        ).join(', ')}</span></li>
      </ul>`;
      })
      .join('');
  }
  countryListContainer.innerHTML = markup;
}
