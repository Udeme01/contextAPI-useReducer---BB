// /api/fetchContent.js
export default async function handler(req, res) {
  try {
    const {
      CONTENTFUL_SPACE_ID,
      CONTENTFUL_ENVIRONMENT,
      CONTENTFUL_ACCESS_TOKEN,
    } = process.env;

    if (
      !CONTENTFUL_SPACE_ID ||
      !CONTENTFUL_ENVIRONMENT ||
      !CONTENTFUL_ACCESS_TOKEN
    ) {
      return res
        .status(500)
        .json({ error: "Environment variables are missing." });
    }

    const response = await fetch(
      `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=fitin&include=2`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data from Contentful" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
}
