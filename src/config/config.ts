export default {
  PORT: Number(process.env.PORT) || 5000,
  mongoUrl: process.env.MONGODB_HOST,
  mongoDB: process.env.MONGODB_DB,
  useNewUrlParser: process.env.USE_NEW_URL_PARSER,
  logLevel: process.env.LOG_LEVEL,
  allowedHeaders: process.env.ALLOWED_HEADERS,
  requestBodyLimit: process.env.REQUEST_BODY_LIMIT,
  responseBodyLimit: process.env.RESPONSE_BODY_LIMIT,
  redactedKeys: process.env.REDACTED_KEYS,
  loggerSkipPaths: process.env.LOGGER_SKIP_PATHS,
  loggerSkipQueries: process.env.LOGGER_SKIP_QUERIES,
};
