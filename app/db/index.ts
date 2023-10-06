import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
  
// for query purposes
const database_uri = process.env.DB_URI || ""
const queryClient = postgres(database_uri);
export const db: PostgresJsDatabase = drizzle(queryClient)