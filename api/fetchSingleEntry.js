export default async function handler(req, res) {
  const { entryId } = req.query; // Get the entry ID from the query parameter

  if (!entryId) {
    return res.status(400).end();
    // .json({ error: "Entry ID is required" });
  }

  try {
    const {
      CONTENTFUL_SPACE_ID,
      CONTENTFUL_ENVIRONMENT,
      CONTENTFUL_ACCESS_TOKEN,
    } = process.env;

    // Check for missing environment variables
    if (
      !CONTENTFUL_SPACE_ID ||
      !CONTENTFUL_ENVIRONMENT ||
      !CONTENTFUL_ACCESS_TOKEN
    ) {
      return res.status(500).end();
      // .json({ error: "Environment variables are missing." });
    }

    // Fetch the specific entry from Contentful
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries/${entryId}?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=fitin`
    );

    if (!response.ok) {
      return res.status(response.status).end();
      // .json({ error: "Failed to fetch the entry from Contentful" });
    }

    const data = await response.json();
    res.status(200).json(data); // Return the data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
}
