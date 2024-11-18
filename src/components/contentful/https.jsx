import { client } from "./ContentfulClient";

export const fetchAllEntries = async () => {
  const response = await client.getEntries({
    content_type: "fitin",
  });
//   console.log(response);

  if (!response.items) {
    throw new Error("Failed to fetch product items");
  }

  return response?.items;
};
