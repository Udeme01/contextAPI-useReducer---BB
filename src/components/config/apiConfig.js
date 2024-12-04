const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const apiConfig = {
  baseUrl: `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}`,
  accessToken,
  endpoints: {
    entries: "/entries",
    assets: "/assets",
  },
};

export default apiConfig;
