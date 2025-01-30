import { getAllPostsData } from "../../scripts/http/posts.js";

export default async () => {
  const data = await getAllPostsData({ type: "index" });
  const posts = data.posts;
  return {
    posts: posts || [],
  };
};
