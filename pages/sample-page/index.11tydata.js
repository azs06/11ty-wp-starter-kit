import getAllData from "../../scripts/http/pages.js";

export default async () => {
  const pageData = await getAllData("sample-page");
  return {
    title: pageData.title || "Default Title",
    pageData: pageData.content || "<p>Default Content</p>",
  };
};
