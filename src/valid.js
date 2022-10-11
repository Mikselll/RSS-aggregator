import onChange from 'on-change';
import * as yup from 'yup';
import render from './render.js';

const added = [];

yup.setLocale({
  string: {
    url: 'Ссылка должна быть валидным URL',
    notOneOf: 'RSS уже существует',
  },
});

const schema = yup.object().shape({
  website: yup.string().url().notOneOf(added),
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
    added.push(elements.field.textContent);
    state.form.field.website = elements.field.textContent;
    const error = validate(state.form.field);
    console.log(error);
    state.form.error = error;
    state.form.valid = state.form.error === '';
  });
};

export default valid;
