/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:5xzyBYsg0cje@ep-small-glitter-a5t2v2bv.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
  };