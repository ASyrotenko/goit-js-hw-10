export const fetchCountries = function (countryName) {
  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(onFetcheroor);
    }
    return response.json();
  });
};
