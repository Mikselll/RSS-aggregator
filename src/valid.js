import onChange from 'on-change';
import keyBy from 'lodash/keyBy.js';
import * as yup from 'yup';
import render from './render.js';

const added = [];

const schema = yup.object().shape({
  website: yup
    .string()
    .url()
    .notOneOf(added),
});

const validate = (field) => {
  try {
    schema.validateSync(field, { abortEarly: false });
    return '';
  } catch (e) {
    return e.message;
  }
};

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
      field: {
        website: '',
      },
      error: '',
    },
  }, render(elements));

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    state.form.field.website = elements.field.textContent;
    const error = validate(state.form.field);
    console.log(error);
    state.form.error = error;
    state.form.valid = state.form.error === '';
  });
};

export default valid;
