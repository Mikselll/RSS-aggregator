import * as yup from 'yup';
import i18next from 'i18next';
import view from './view.js';
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

  const state = {
    form: {
      processState: 'filling',
      links: [],
      error: null,
    },
    feeds: [],
    posts: [],
    UIstate: {
      currentPostId: null,
      postsId: [],
    },
  };

  const watchedState = view(state, elements, i18n);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.form.processState = 'filling';
    validate(elements.field.value, watchedState.form.links)
      .then((url) => {
        elements.field.value = '';
        watchedState.form.processState = 'loading';
        watchedState.form.error = null;
        loader(url, watchedState);
      })
      .catch((error) => {
        watchedState.form.processState = 'error';
        watchedState.form.error = error.message;
      });
  });

  elements.posts.addEventListener('click', (e) => {
    const { id } = e.target.dataset;
    watchedState.UIstate.postsId.push(id);
    watchedState.UIstate.currentPostId = id;
  });

  updater(watchedState);
};

export default app;
