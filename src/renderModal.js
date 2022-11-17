const renderModal = (state, UIstate, elements) => {
  const link = document.querySelector(`[data-id="${UIstate.currentPostId}"]`);
  link.removeAttribute('class');
  link.classList.add('fw-normal', 'link-secondary');

  const currentPost = state.posts.flat().find((post) => post.id === UIstate.currentPostId);
  elements.modalTitle.textContent = currentPost.title;
  elements.modalBody.textContent = currentPost.description;
  elements.modalLink.setAttribute('href', currentPost.link);
};

export default renderModal;
