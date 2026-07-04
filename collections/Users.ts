import type { CollectionConfig } from "payload";

// Auth-enabled collection. Protects the /admin panel and the REST/GraphQL API.
export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email" },
  auth: true,
  fields: [
    { name: "name", type: "text" },
  ],
};
