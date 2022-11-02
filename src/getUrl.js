const getUrl = (url) => {
  const proxyURL = new URL('https://allorigins.hexlet.app/get');
  proxyURL.searchParams.set('disableCache', true);
  proxyURL.searchParams.set('url', url);
  return proxyURL.toString();
};

export default getUrl;
