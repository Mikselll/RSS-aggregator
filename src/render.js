const renderError = (elements, error) => {
  if (error === null) {
    return;
  } else {
    elements.feedback.textContent = error;
  }
};

const renderProccess = (elements, processState) => {
  if (processState === 'error') {
    elements.field.classList.add('is-invalid');
    elements.feedback.classList.replace('text-success', 'text-danger');
  }
  if (processState === 'added') {
    elements.field.classList.remove('is-invalid');
    elements.feedback.classList.replace('text-danger', 'text-success');
    elements.feedback.textContent = 'RSS успешно загружен';
  }
}

const render = (elements) => (path, value) => {
  if (path === 'form.error') {
    renderError(elements, value);
  }
  if (path === 'processState') {
    renderProccess(elements, value);
  }
};

export default render;
