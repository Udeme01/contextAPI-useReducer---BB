// fetch multiple entries
export const fetchAllEntries = async () => {
  const response = await fetch("/api/fetchContent");
  // const response = await fetch(
  //   `https://cdn.contentful.com/spaces/if5o0uzuywbh/environments/master/entries?access_token=WKDh2DUCsUwONv29xdvVyM7U6eNR6KsHfdJJFcNY9eE&content_type=fitin&include=2`
  // );

  if (!response.ok) {
    return;
  }

  const data = await response.json();

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
  // const response = await fetch(
  //   `${apiConfig.baseUrl}${apiConfig.endpoints.entries}/${entryId}?access_token=${apiConfig.accessToken}&content_type=fitin`
  // );
  const response = await fetch(`/api/fetchSingleEntry?entryId=${entryId}`);

  if (!response.ok) {
    console.log("error fetching single entry");
    return;
    // throw new Error(`HTTP ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();

  let imageUrl = "";
  if (data.fields.fitinImage?.sys?.id) {
    // Fetch the linked image asset
    const assetId = data.fields.fitinImage?.sys.id;
    // const assetResponse = await fetch(
    //   `${apiConfig.baseUrl}${apiConfig.endpoints.assets}/${assetId}?access_token=${apiConfig.accessToken}`
    // );
    const assetResponse = await fetch(`/api/fetchAsset?assetId=${assetId}`);

    if (assetResponse.ok) {
      const assetData = await assetResponse.json();
      // console.log(assetData);
      imageUrl = assetData.fields.file.url || "";
    }
  }

  // Resolve the gallery image URLs
  let galleryImageUrls = [];
  if (data.fields.galleryImages) {
    // Extract asset IDs
    const galleryImageIds = data.fields.galleryImages.map(
      (image) => image.sys.id
    );

    const fetchGalleryAssets = galleryImageIds.map((id) =>
      fetch(`/api/fetchAsset?id=${id}`)
    );

    // Fetch each asset for gallery images
    // const fetchGalleryAssets = galleryImageIds.map((id) =>
    //   fetch(
    //     `${apiConfig.baseUrl}${apiConfig.endpoints.assets}/${id}?access_token=${apiConfig.accessToken}`
    //   )
    // );

    // Resolve all promises
    const galleryResponses = await Promise.all(fetchGalleryAssets);

    // Process each response
    galleryImageUrls = await Promise.all(
      galleryResponses.map(async (response) => {
        if (response.ok) {
          const assetData = await response.json();
          return assetData.fields.file.url || ""; // Extract the URL or default to an empty string
        }
        return ""; // Default to empty string if the fetch fails
      })
    );
  }

  // console.log(galleryImageUrls);

  return {
    id: data.sys.id,
    title: data.fields.fitinTitle || "Untitled",
    description: data.fields.fitinDescription || "",
    image: imageUrl,
    galleryImages: galleryImageUrls,
    price: data.fields.fitinPrice || 0,
    colors: data.fields.colors || "",
    sizes: data.fields.sizes || "",
  };
};
