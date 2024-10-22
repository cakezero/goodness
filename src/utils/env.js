import dotenv from 'dotenv';

dotenv.config()

const ENV = {
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT
}

export default ENV;