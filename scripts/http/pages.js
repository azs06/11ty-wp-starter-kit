const Client = require("./apollo.cjs");
const { gql } = require("@apollo/client/core");

/**
 * Fetch page/post data from WordPress
 *
 * @param {string} slug - The slug of the page or post.
 * @returns {Promise} - The fetched data.
 */
async function fetchPageData(slug) {
  const PAGE_QUERY = gql`
    query GetPostsEdges {
      page(id: "sample-page", idType: URI) {
        id
        content
        slug
        title
      }
    }
  `;
  const variables = {
    slug,
  };

  try {
    const result = await Client.query({
      query: PAGE_QUERY,
      variables,
    });
    return result.data.page;
  } catch (error) {
    console.error("Error fetching page data:", error);
    throw new Error("Failed to fetch page data");
  }
}


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
  