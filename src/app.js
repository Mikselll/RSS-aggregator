import onChange from 'on-change';
import * as yup from 'yup';
import i18next from 'i18next';
import render from './render.js';
import loader from './loader.js';
import resources from './locales/index.js';

yup.setLocale({
  mixed: {
    notOneOf: 'notOneOf',
    required: 'required',
  },
  string: {
    url: 'invalidURL',
  },
});

const validate = (url, feeds) => {
  const schema = yup.string().required().url().notOneOf(feeds);
  return schema.validate(url);
};

const app = () => {
  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: false,
    resources,
  });

  const elements = {
    form: document.querySelector('.rss-form'),
    field: document.querySelector('#url-input'),
    button: document.querySelector('.btn-lg'),
    feedback: document.querySelector('.feedback'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
  };

  const state = onChange({
    form: {
      processState: 'filling',
      field: '',
      error: null,
    },
    feeds: [],
    posts: [],
  }, render(elements, i18n));

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.form.processState = 'filling';
    validate(elements.field.value, state.feeds)
      .then((url) => {
        state.form.processState = 'loading';
        state.form.error = null;
        state.form.field = url;
        loader(url, state);
      })
      .catch((error) => {
        state.form.processState = 'error';
        state.form.error = error.message;
      });
  });
};

export default app;
