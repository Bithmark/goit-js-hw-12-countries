import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import countryCard from './js/templates/country-card.hbs';
import countryList from './js/templates/country-list.hbs';
import * as PNotify from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  container: document.querySelector('.container'),
  input: document.querySelector('.input'),
};

refs.input.addEventListener('input', debounce(onInput, 500));

function onInput(event) {
  const element = event.target.value;
  fetchCountries(element)
    .then(data => {
      if (data.length > 10) {
        onSpecificNotification();
        clearContainer();
      }
      if (data.length >= 2 && data.length < 10) {
        countries(data, countryList);
      }
      if (data.length === 1) {
        countries(data, countryCard);
      }
    })
    .catch(data => onErrorNotification())
    .finally(clearContainer());
}

function countries(country, templates) {
  const markup = templates(country);
  refs.container.innerHTML = markup;
}

function clearContainer() {
  refs.container.innerHTML = '';
}

function onSpecificNotification() {
  PNotify.error({
    text: 'Too many matches found. Please enter a more specific query!',
    hide: true,
    delay: 2000,
  });
}

function onErrorNotification() {
  PNotify.error({
    text: 'Country is not found.',
    hide: true,
    delay: 2000,
  });
}
