import 'dotenv/config';

import type { Config } from 'drizzle-kit';

const getEnvVariable = (name: string) => {
  const value = process.env[name];
  if (value == null) throw new Error(`environment variable ${name} not found`);
  return value;
};

export default {
  dialect: 'sqlite',
  schema: './src/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: getEnvVariable('DATABASE_URL'),
    token: getEnvVariable('DATABASE_AUTH_TOKEN')
  }
} satisfies Config;
