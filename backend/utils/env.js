import 'dotenv/config'

export const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
  FALLYTICS_AI_KEY1: process.env.FALLYTICS_AI_KEY1,
  FALLYTICS_AI_KEY2: process.env.FALLYTICS_AI_KEY2,
  FALLYTICS_AI_KEY3: process.env.FALLYTICS_AI_KEY3,
  FALLYTICS_AI_KEY4: process.env.FALLYTICS_AI_KEY4,
  MONGO_URI_PUBLIC: process.env.MONGO_URI_PUBLIC
}; 