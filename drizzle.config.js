/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://accounts:mv4Mx0OdHZQA@ep-weathered-heart-a58wmzem.us-east-2.aws.neon.tech/AI-Course-Generator?sslmode=require',
    }
  };