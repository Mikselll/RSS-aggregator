import onChange from 'on-change';
import * as yup from 'yup';
import render from './render.js';
import keyBy from 'lodash/keyBy.js';

const added = [];

const schema = yup.object().shape({
    website: yup.string()
    .matches(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm, 'Ссылка должна быть валидным URL')
    .notOneOf(added),
});

const validate = (field) => {
  try {
    schema.validateSync(field, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path')
  }
};

const valid = () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    field: document.querySelector('#url-input'),
    submit: document.querySelector('.btn-lg'),
    feedback: document.querySelector('.feedback'),
  }

  const state = onChange({
    form: {
      valid: true,
      field: {
        website: '', 
      },
      error: '',
      }
  }, render(elements))

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.field.website = elements.field.textContent;
    const error = validate(state.form.field).website.message;
    state.form.error = error;
    state.form.valid = state.form.error = '' ? true : false;
  })
}

export default valid;