// src/config/apiConfig.js

const spaceId = "if5o0uzuywbh"; // Replace with your Contentful space ID
const environment = "master"; // Replace with your environment (default: master)
const accessToken = "WKDh2DUCsUwONv29xdvVyM7U6eNR6KsHfdJJFcNY9eE"; // Replace with your Contentful access token

const apiConfig = {
  baseUrl: `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}`,
  accessToken,
  endpoints: {
    entries: "/entries",
    assets: "/assets",
  },
};

export default apiConfig;
