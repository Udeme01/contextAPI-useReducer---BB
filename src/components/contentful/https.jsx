import { client } from "./ContentfulClient";

export const fetchAllEntries = async () => {
  const response = await client.getEntries({
    content_type: "fitin",
  });
  //   console.log(response);

  if (!response.items) {
    throw new Error("Failed to fetch product items");
  }

  return response.items?.map((item) => ({
    id: item.sys.id, // Extract the ID from `sys`
    image: item.fields.fitinImage?.fields.file.url || "", // Safely extract the image URL
    description: item.fields.fitinDescription || "", // Default to an empty string if undefined
    title: item.fields.fitinTitle || "Untitled", // Provide a default title if missing
    price: item.fields.fitinPrice || 0, // Default price to 0 if undefined
  }));
};
