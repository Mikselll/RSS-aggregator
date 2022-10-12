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
    form: {
      valid: true,
      field: '',
      error: null,
      feeds: [],
    },
  }, render(elements));

  yup.setLocale({
    string: {
      url: 'Ссылка должна быть валидным URL',
      notOneOf: 'RSS уже существует'
    },
  });
  
  const validate = (url, feeds) => {
    const schema = yup.string().required().url().notOneOf(feeds);
    return schema.validate(url);
  };

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    validate(elements.field.textContent, state.form.feeds)
    .then((url) => {
      state.form.valid = true;
      state.form.error = null;
      state.form.field = url;
      state.form.feeds.push(url);
    })
    .catch((error) => {
      state.form.error = error.message;
      state.form.valid = false;
    })
  });
};

export default valid;
