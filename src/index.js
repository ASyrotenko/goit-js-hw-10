import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countryListContainer = document.querySelector('.country-list');
const countryInfoContainer = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const searchCountry = e.target.value;
  if (!searchCountry) {
    clearCountryList();
    return;
  }
  fetchCountries(searchCountry.trim())
    .then(renderCountryList)
    .catch(onFetcheroor);
}

function renderCountryList(countries) {
  let markup = '';

  if (countries.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.',
      { clickToClose: true }
    );
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

function clearCountryList() {
  countryListContainer.innerHTML = '';
}

function onFetcheroor() {
  Notiflix.Notify.failure('Oops, there is no country with that name', {
    clickToClose: true,
  });
}
