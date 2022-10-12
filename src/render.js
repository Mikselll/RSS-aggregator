const renderError = (elements, error, prevError) => {
  const validFeedback = 'RSS успешно загружен';
  if (prevError === null && error === null) {
    elements.feedback.textContent = validFeedback;
    return;
  }

  if (prevError !== null && error === null) {
    elements.field.classList.remove('is-invalid');
    elements.feedback.classList.remove('text-danger');
    elements.feedback.classList.add('text-success');
    elements.feedback.textContent = validFeedback;
    return;
  }

  if (prevError !== null && error !== null) {
    elements.feedback.textContent = error;
    return;
  }

  elements.field.classList.add('is-invalid');
  elements.feedback.classList.remove('text-success');
  elements.feedback.classList.add('text-danger');
  elements.feedback.textContent = error;
};

const render = (elements) => (path, value, prevValue) => {
  if (path === 'form.error') {
    renderError(elements, value, prevValue);
  }
};

export default render;
