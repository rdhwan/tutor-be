const env = {
  APP_PORT: Number(process.env.APP_PORT) || 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default env;
