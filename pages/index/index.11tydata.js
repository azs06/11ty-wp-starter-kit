import getAllData from "../../scripts/http/pages.js";

export default async () => {
  const pageData = await getAllData("/sample-post");
  return {
    title: pageData.title || "Default Title",
    pageData: pageData.content || "<p>Default Content</p>",
  };
};
