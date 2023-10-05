import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
 
// for migrations
const migrationClient = postgres("postgres://postgres:mysecretpassword@localhost:5433/postgres", { max: 1 });
migrate(drizzle(migrationClient), { migrationsFolder: './drizzle' })
 
// for query purposes
const queryClient = postgres("postgres://postgres:mysecretpassword@localhost:5433/postgres");
export const db: PostgresJsDatabase = drizzle(queryClient)