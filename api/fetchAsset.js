export default async function handler(req, res) {
  const { assetId } = req.query;

  if (!assetId) {
    // return res.status(400).end();
    // .json({ error: "Asset ID is required" });
    return;
  }

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
      //   return res.status(500).end();
      // .json({ error: "Environment variables are missing" });
      throw new Response({ status: 500 });
    }

    const response = await fetch(
      `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/assets/${assetId}?access_token=${CONTENTFUL_ACCESS_TOKEN}`
    );

    if (!response.ok) {
      //   return res.status(response.status).end();
      // .json({ error: `Failed to fetch asset: ${response.statusText}` });
      throw new Response({ status: response.status });
    }

    const data = await response.json();
    res.status(200).json(data); // Send the asset data back to the frontend
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ error: "An unexpected error occurred" });
    throw new Response({ status: 500 });
  }
}
