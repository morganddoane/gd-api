import dotenv from 'dotenv';
import 'module-alias/register';
import 'reflect-metadata';

dotenv.config();

export const env = {
    PORT: Number.parseInt(process.env.PORT || '8080'),
    CORS_WHITELIST: process.env.CORS_WHITELIST.split(' '),
};
