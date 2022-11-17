import onChange from 'on-change';
import * as yup from 'yup';
import i18next from 'i18next';
import render from './render.js';
import renderModal from './renderModal.js';
import loader from './loader.js';
import updater from './updater.js';
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

const validate = (url, links) => {
  const schema = yup.string().required().url().notOneOf(links);
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
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalLink: document.querySelector('.full-article'),
  };

  const UIstate = {
    currentPostId: null,
    postsId: [],
  };

  const state = onChange({
    form: {
      processState: 'filling',
      links: [],
      error: null,
    },
    feeds: [],
    posts: [],
  }, render(elements, i18n, UIstate));

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.form.processState = 'filling';
    validate(elements.field.value, state.form.links)
      .then((url) => {
        state.form.processState = 'loading';
        state.form.error = null;
        loader(url, state);
      })
      .catch((error) => {
        state.form.processState = 'error';
        state.form.error = error.message;
      });
  });

  elements.posts.addEventListener('click', (e) => {
    const { id } = e.target.dataset;
    UIstate.postsId.push(id);
    UIstate.currentPostId = id;
    renderModal(state, UIstate, elements);
  });

  updater(state);
};

export default app;
