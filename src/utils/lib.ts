import { cloudinary, logger } from '../middlewares';
import { Request, Response } from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { Model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import { envConfig } from '../config';
import { Interface } from 'readline';

const getSlug = (title: string) => {
  const lowerCaseTitle = title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/ +(?= )/g, '');
  return lowerCaseTitle.split(' ').join('-');
};

export const generateSlug = async (title: string, dbModal: typeof Model) => {
  const MAX_TRIES = 10;
  let slug = getSlug(title);
  let counter = 0;

  let existingSlug = await dbModal.exists({ slug });

  while (existingSlug && counter < MAX_TRIES) {
    slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
    existingSlug = await dbModal.exists({ slug });
    counter++;
  }
  if (counter === MAX_TRIES) {
    logger.error('Error generating slug', { label: 'generateSlug' });
    throw new Error('Error generating slug');
  }
  return slug;
};

export const fileUpload = async (req: Request, folder = 'blog') => {
  logger.info('Uploading to cloudinary', { label: 'fileUpload' });
  try {
    const file = req.file;
    const buffer = file?.buffer || Buffer.from('');
    const tempFilePath = path.join(os.tmpdir(), file?.originalname || '');

    fs.writeFile(tempFilePath, buffer, (err) => {
      if (err) {
        logger.error('Error writing file to temp folder', {
          label: 'fileUpload',
        });
        throw new Error('Error writing file to temp folder');
      }
    });

    const response = await cloudinary.v2.uploader.upload(tempFilePath, {
      folder: folder,
    });
    fs.unlink(tempFilePath, (err) => {
      if (err) {
        logger.error('Error deleting file from temp folder', {
          label: 'fileUpload',
        });
        throw new Error('Error deleting file from temp folder');
      }
    });
    return response.secure_url;
  } catch (error: any) {
    logger.error(error.message, { label: 'fileUpload' });
    throw new Error(`Error uploading to cloudinary', ${error.message}`);
  }
};

export const deleteFile = async (file: string) => {
  try {
    const response = await cloudinary.v2.uploader.destroy(file);
    return response;
  } catch (error) {
    logger.error('Error deleting from cloudinary', { label: 'deleteFile' });
    throw new Error('Error deleting from cloudinary');
  }
};

export const encryptPassword = async (password: string) => {
  logger.info('Encrypting password', { label: 'encryptPassword' });
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    logger.error('Error encrypting password', { label: 'encryptPassword' });
    throw new Error('Error encrypting password');
  }
};

export const decryptPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  logger.info('Decrypting password', { label: 'decryptPassword' });
  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    logger.error('Error decrypting password', { label: 'decryptPassword' });
    throw new Error('Error decrypting password');
  }
};

interface ITokenPayload {
  id: Types.ObjectId;
  email: string;
  role: string;
}
export const generateToken = (user: ITokenPayload) => {
  logger.info('Generating token', { label: 'generateToken' });
  try {
    const token = jwt.sign(user, envConfig.secret, { expiresIn: '1d' });
    return token;
  } catch (error) {
    logger.error('Error generating token', { label: 'generateToken' });
    throw new Error('Error generating token');
  }
};
