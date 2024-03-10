import mongoose from 'mongoose';
import { envConfig } from '../config';
import { logger } from '../middlewares';
const { db, password, username } = envConfig;

const dbUrl = db.replace('<password>', password);

const connect = async () => {
  try {
    await mongoose.connect(dbUrl, {
      auth: {
        username,
        password,
      },
    });
    logger.info('db connected 🌐');
  } catch (err) {
    logger.error('db connection failed ❌ , error: ', err);
  }
};

export const close = async () => {
  try {
    await mongoose.connection.close();
    logger.info('db connection closed 🌐');
  } catch (err) {
    logger.error('db connection close failed ❌ , error: ', err);
  }
};

export const truncate = async () => {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection;
    const promises = Object.keys(collections).map((collection) =>
      mongoose.connection.collection(collection).deleteMany({}),
    );
    await Promise.all(promises);
  }
};

export default connect;
