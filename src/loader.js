import axios from 'axios';
import { uniqueId } from 'lodash';
import parsing from './parser.js';
import getUrl from './getUrl.js';

const loader = (url, state) => {
  axios
    .get(getUrl(url))
    .then((responce) => {
      const { feed, posts } = parsing(responce);
      feed.id = uniqueId();
      posts.forEach((post) => post.id = uniqueId());
      state.form.links.push(url);
      state.feeds.push(feed);
      state.posts.push(posts);
      state.form.processState = 'added';
    })
    .catch((error) => {
      if (error.isParsingError) {
        state.form.error = 'parsingError';
      } else if (error.isAxiosError) {
        state.form.error = 'networkError';
      } else {
        state.form.error = 'unknown';
      }
    });
};

export default loader;
