const getAllData = require('../../scripts/http/pages.cjs');

module.exports = async () => {
  const pageData = await getAllData('/sample-post');
  return {
    title: pageData.title || 'Default Title',
    pageData: pageData.content || '<p>Default Content</p>',
  };
};