import Client from "./apollo.js";

import {
  QUERY_ALL_POSTS_INDEX,
  QUERY_ALL_POSTS_ARCHIVE,
  QUERY_ALL_POSTS,
  QUERY_POST_BY_SLUG,
  QUERY_POSTS_BY_AUTHOR_SLUG_INDEX,
  QUERY_POSTS_BY_AUTHOR_SLUG_ARCHIVE,
  QUERY_POSTS_BY_AUTHOR_SLUG,
  QUERY_POSTS_BY_CATEGORY_ID_INDEX,
  QUERY_POSTS_BY_CATEGORY_ID_ARCHIVE,
  QUERY_POSTS_BY_CATEGORY_ID,
  QUERY_POST_SEO_BY_SLUG,
  QUERY_POST_PER_PAGE,
} from "../../graphql/posts.js";

/**
 * postPathBySlug
 */

export function postPathBySlug(slug) {
  return `/posts/${slug}`;
}

const allPostsIncludesTypes = {
  all: QUERY_ALL_POSTS,
  archive: QUERY_ALL_POSTS_ARCHIVE,
  index: QUERY_ALL_POSTS_INDEX,
};

export async function getAllPosts(options = { type: "index" }) {
  const query = allPostsIncludesTypes[options.type];
  try {
    const result = await Client.query({
      query: query,
    });
    return result.data;
  } catch (error) {
    console.error("Error fetching page data:", error);
    throw new Error("Failed to fetch page data");
  }
}

export async function getAllPostsData(options = { type: "index" }) {
  try {
    const rawData = await getAllPosts(options);

    const posts = rawData?.posts.edges.map(({ node = {} }) => node);

    return {
      posts: Array.isArray(posts) && posts.length ? posts : [],
    };
  } catch (error) {
    console.error("Error in getAllPostsData:", error);
    throw new Error("Failed to get all data");
  }
}
