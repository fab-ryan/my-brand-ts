import dontenv from 'dotenv';
dontenv.config();
interface IConfiguration {
  development: {
    port: string;
    db: string;
    password: string;
    username: string;
    secret: string;
    cloudinary_api_name: string;
    cloudinary_api_key: string;
    cloudinary_api_secret: string;
  };
  test: {
    port: string;
    db: string;
    username: string;
    password: string;
    secret: string;
    cloudinary_api_name: string;
    cloudinary_api_key: string;
    cloudinary_api_secret: string;
  };
  production: {
    port: string;
    db: string;
    username: string;
    secret: string;
    password: string;
    cloudinary_api_name: string;
    cloudinary_api_key: string;
    cloudinary_api_secret: string;
  };
}

const config: IConfiguration = {
  development: {
    port: process.env.DEV_PORT || '3000',
    db: process.env.DEV_DB_URL || 'mongodb://localhost:27017/express-mongo',
    username: process.env.DEV_DB_USERNAME || 'username',
    password: process.env.DEV_DB_PASSWORD || 'password',
    secret: process.env.PRIVATE_KEY || 'mysecret',
    cloudinary_api_name: process.env.CLOUDINARY_USER_NAME || 'myname',
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY || 'mykey',
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || 'mysecret',
  },
  test: {
    port: process.env.TEST_PORT || '3000',
    db:
      process.env.TEST_DB_URL || 'mongodb://localhost:27017/express-mongo-test',
    username: process.env.TEST_DB_USERNAME || 'username',
    password: process.env.TEST_DB_PASSWORD || 'password',
    secret: process.env.PRIVATE_KEY || 'mysecret',

    cloudinary_api_name: process.env.CLOUDINARY_USER_NAME || 'myname',
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY || 'mykey',
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || 'mysecret',
  },
  production: {
    port: process.env.PORT || '3000',
    db: process.env.PROD_DB_URL || 'mongodb://localhost:27017/express-mongo',
    username: process.env.PROD_DB_USERNAME || 'username',
    password: process.env.PROD_DB_PASSWORD || 'password',
    secret: process.env.PRIVATE_KEY || 'mysecret',
    cloudinary_api_name: process.env.CLOUDINARY_USER_NAME || 'myname',
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY || 'mykey',
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || 'mysecret',
  },
};

const env = (process.env.NODE_ENV as keyof IConfiguration) || 'development';
const currentConfig = config[env];
export { currentConfig };
