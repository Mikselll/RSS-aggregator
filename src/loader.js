import axios from 'axios';
import uniqueId from 'lodash';
import parser from './parser.js';
import getUrl from './getUrl.js';

const loader = (url, state) => {
  axios
    .get(getUrl(url))
    .then((responce) => {
      state.form.processState = 'added';
      const { feed, posts } = parser(responce);
      feed.id = uniqueId();
      posts.id = uniqueId();
      state.feeds.push(feed);
      state.posts.push(posts);
    })
    .catch((error) => {
      state.form.processState = 'error';
      if (error.isParsingError) {
        state.form.error = 'parsingError';
      }
      if (error.isAxiosError) {
        state.form.error = 'networkError';
      }
    });
};

export default loader;
