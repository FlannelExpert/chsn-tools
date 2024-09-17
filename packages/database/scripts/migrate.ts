import 'dotenv/config';

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { client } from '@/database.js';

const main = async () => {
  await migrate(drizzle(client), {
    migrationsFolder: `${__dirname}/../drizzle`
  });
  await client.close();
  process.exit(0);
};

void main();
