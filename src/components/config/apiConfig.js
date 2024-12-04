// src/config/apiConfig.js

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID; // Replace with your Contentful space ID
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT; // Replace with your environment (default: master)
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN; // Replace with your Contentful access token

const apiConfig = {
  baseUrl: `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}`,
  accessToken,
  endpoints: {
    entries: "/entries",
    assets: "/assets",
  },
};

export default apiConfig;
