const fetchPageData = require('./fetch-page-data.cjs');

/**
 * Fetch data for a specific page by its slug
 *
 * @param {string} slug - The slug of the page.
 * @returns {Object} - Page data with a simplified structure.
 */
async function getAllData(slug = '') {
  try {
    const rawData = await fetchPageData(slug);

    return {
      title: rawData?.title || '',
      content: rawData?.content || '',
      slug: rawData?.slug || '',
    };
  } catch (error) {
    console.error("Error in getAllData:", error);
    throw new Error("Failed to get all data");
  }
}

module.exports = getAllData;
