import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(__dirname, '../.env');
console.log(`Loading environment variables from: ${envPath}`);
dotenv.config({ path: envPath });

// Debugging: Check if environment variables are loaded
console.log('DB_USERNAME in config.ts:', process.env.DB_USERNAME);
console.log('DB_PASSWORD in config.ts:', process.env.DB_PASSWORD);
