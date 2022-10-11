const renderError = (elements, error, prevError) => {
  if (prevError === '' && error === '') {
    return;
  }

  if (prevError !== '' && error === '') {
    elements.field.classList.remove('is-invalid');
    return;
  }

  if (prevError !== '' && error !== '') {
    elements.feedback.textContent = error;
    return;
  }

  elements.field.classList.add('is-invalid');
  elements.feedback.textContent = error;
};

const render = (elements) => (path, value, prevValue) => {
  if (path === 'form.error') {
    renderError(elements, value, prevValue);
  }
};

export default render;
