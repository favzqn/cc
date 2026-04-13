import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment-specific .env file
const env = process.env.TEST_ENV || 'demo';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });
dotenv.config({ path: path.resolve(process.cwd(), '.env') }); // fallback

interface EnvConfig {
  environment: string;
  baseUrl: string;
  apiBaseUrl: string;
  adminUser: string;
  adminPassword: string;
  anthropicApiKey: string;
  slowMo: number;
}

export const config: EnvConfig = {
  environment: env,
  baseUrl: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
  apiBaseUrl: process.env.API_BASE_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2',
  adminUser: process.env.ADMIN_USER || 'Admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
  slowMo: parseInt(process.env.SLOW_MO || '0', 10),
};
