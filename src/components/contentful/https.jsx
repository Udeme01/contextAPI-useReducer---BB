import apiConfig from "../config/apiConfig";

// fetch multiple entries
export const fetchAllEntries = async () => {
  const response = await fetch(
    `${apiConfig.baseUrl}${apiConfig.endpoints.entries}?access_token=${apiConfig.accessToken}&content_type=fitin&include=2`
  );

  const data = await response.json();
  // console.log(data);

  // Map the assets from `includes.Asset`
  const assets = data.includes?.Asset || [];

  // Helper function to find an asset by its ID
  const getAssetUrl = (assetId) => {
    const asset = assets.find((asset) => asset.sys.id === assetId);
    return asset?.fields.file.url || "";
  };

  return data.items?.map((item) => ({
    id: item.sys.id, // Extract the ID from `sys`
    image: getAssetUrl(item.fields.fitinImage?.sys.id) || "", // Safely extract the image URL
    description: item.fields.fitinDescription || "", // Default to an empty string if undefined
    title: item.fields.fitinTitle || "Untitled", // Provide a default title if missing
    price: item.fields.fitinPrice || 0, // Default price to 0 if undefined
    colors: item.fields.colors || "",
    sizes: item.fields.sizes || "",
  }));
};

// fetch a single entry
export const fetchEntry = async (entryId) => {
  const response = await fetch(
    `${apiConfig.baseUrl}${apiConfig.endpoints.entries}/${entryId}?access_token=${apiConfig.accessToken}&content_type=fitin`
  );

  const data = await response.json();
  // console.log(data);

  let imageUrl = "";
  if (data.fields.fitinImage?.sys?.id) {
    // Fetch the linked image asset
    const assetId = data.fields.fitinImage?.sys.id;
    const assetResponse = await fetch(
      `${apiConfig.baseUrl}${apiConfig.endpoints.assets}/${assetId}?access_token=${apiConfig.accessToken}`
    );

    if (assetResponse.ok) {
      const assetData = await assetResponse.json();
      imageUrl = assetData.fields.file.url || "";
    }
  }

  return {
    id: data.sys.id,
    title: data.fields.fitinTitle || "Untitled",
    description: data.fields.fitinDescription || "",
    image: imageUrl,
    price: data.fields.fitinPrice || 0,
    colors: data.fields.colors || "",
    sizes: data.fields.sizes || "",
  };
};
