import onChange from 'on-change';
import * as yup from 'yup';
import render from './render.js';

const valid = () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    field: document.querySelector('#url-input'),
    submit: document.querySelector('.btn-lg'),
    feedback: document.querySelector('.feedback'),
  };

  const state = onChange({
    processState: 'filling',
    form: {
      field: '',
      error: null,
      feeds: [],
    },
  }, render(elements));

  yup.setLocale({
    mixed: {
      notOneOf: 'RSS уже существует',
    },
    string: {
      url: 'Ссылка должна быть валидным URL',
    },
  });
  
  const validate = (url, feeds) => {
    const schema = yup.string().required().url().notOneOf(feeds);
    return schema.validate(url);
  };

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.processState = 'filling';
    validate(elements.field.value, state.form.feeds)
    .then((url) => {
      state.processState = 'added';
      state.form.error = null;
      state.form.field = url;
      state.form.feeds.push(url);
    })
    .catch((error) => {
      state.processState = 'error';
      state.form.error = error.message;
      state.form.valid = false;
    })
  });
};

export default valid;
