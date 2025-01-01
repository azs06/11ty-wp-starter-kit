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
  console.log("PAGE_QUERY", PAGE_QUERY);
  const variables = {
    slug,
  };

  try {
    const result = await Client.query({
      query: PAGE_QUERY,
      variables,
    });

    console.log("result", result);

    return result.data.page;
  } catch (error) {
    console.error("Error fetching page data:", error);
    throw new Error("Failed to fetch page data");
  }
}

module.exports = fetchPageData;
