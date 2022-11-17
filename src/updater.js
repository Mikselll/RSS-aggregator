import axios from 'axios';
import parsing from './parser.js';
import getUrl from './getUrl.js';

const updater = (state) => {
  const { links } = state.form;
  const promises = links.map((link) => axios.get(getUrl(link)));
  Promise
    .all(promises)
    .then((responces) => {
      responces.forEach((responce) => {
        const { posts } = parsing(responce);
        const currentPosts = state.posts.flat().map((post) => post.link);
        const newPosts = posts.filter((post) => !currentPosts.includes(post.link));
        state.posts = newPosts.concat(state.posts);
      });
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => setTimeout(() => updater(state), 5000));
};

export default updater;
