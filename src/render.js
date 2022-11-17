const renderError = (elements, i18n, error) => {
  if (error === null) {
    return;
  }
  elements.feedback.textContent = i18n.t(`feedbacks.${error}`);
};

const renderProccess = (elements, i18n, processState) => {
  if (processState === 'error') {
    elements.button.disabled = false;
    elements.field.classList.add('is-invalid');
    elements.feedback.classList.replace('text-success', 'text-danger');
  }
  if (processState === 'added') {
    elements.button.disabled = false;
    elements.field.classList.remove('is-invalid');
    elements.feedback.classList.replace('text-danger', 'text-success');
    elements.feedback.textContent = i18n.t('feedbacks.validRSS');
  }
  if (processState === 'loading') {
    elements.button.disabled = true;
  } else {
    elements.button.disabled = false;
  }
};

const buildList = (element, name) => {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('card', 'border-0');

  const divForH2 = document.createElement('div');
  divForH2.classList.add('card-body');

  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  h2.textContent = name;

  element.append(mainDiv);
  mainDiv.append(divForH2, ul);
  divForH2.append(h2);
};

const renderFeeds = (elements, i18n, feeds) => {
  elements.feeds.textContent = '';
  buildList(elements.feeds, i18n.t('feeds'));
  const ul = elements.feeds.querySelector('.list-group');

  feeds.forEach(({ title, description }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');

    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');

    h3.textContent = title;
    p.textContent = description;

    ul.append(li);
    li.append(h3, p);
  });
};

const renderPosts = (elements, i18n, posts, UIstate) => {
  elements.posts.textContent = '';
  buildList(elements.posts, i18n.t('posts'));
  const ul = elements.posts.querySelector('.list-group');

  posts.flat().forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const link = document.createElement('a');
    link.setAttribute('href', post.link);
    link.setAttribute('data-id', `${post.id}`);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');

    if (UIstate.postsId.includes(post.id)) {
      link.classList.add('fw-normal', 'link-secondary');
    } else {
      link.classList.add('fw-bold');
    }

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', `${post.id}`);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');

    link.textContent = post.title;
    button.textContent = i18n.t('btn');

    ul.append(li);
    li.append(link, button);
  });
};

const render = (elements, i18n, UIstate) => (path, value) => {
  if (path === 'form.error') {
    renderError(elements, i18n, value);
  }
  if (path === 'form.processState') {
    renderProccess(elements, i18n, value);
  }
  if (path === 'feeds') {
    renderFeeds(elements, i18n, value);
  }
  if (path === 'posts') {
    renderPosts(elements, i18n, value, UIstate);
  }
};

export default render;
