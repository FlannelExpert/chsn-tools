import 'dotenv/config';

import { drizzle } from 'drizzle-orm/postgres-js';
import { createClient } from '@libsql/client';

import * as schema from './schema.js';

const getEnvVariable = (name: string) => {
  const value = process.env[name];
  if (value == null) throw new Error(`environment variable ${name} not found`);
  return value;
};

export const client = createClient({
  url: getEnvVariable('DATABASE_URL'),
  authToken: getEnvVariable('DATABASE_AUTH_TOKEN')
});

export const db = drizzle(client, { schema });
