const getAllData = require('../../scripts/http/page.cjs');

module.exports = async () => {
  const pageData = await getAllData('/sample-post');
  return {
    title: pageData.title || 'Default Title',
    content: pageData.content || '<p>Default Content</p>',
  };
};