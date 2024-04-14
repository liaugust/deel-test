import dotenv from 'dotenv';

dotenv.config();

export const config = {
	port: process.env.PORT,
	clientBaseUrl: process.env.CLIENT_BASE_URL,
}