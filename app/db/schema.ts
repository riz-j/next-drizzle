import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
 
// declaring enum in database
export const popularityEnum = pgEnum('popularity', ['unknown', 'known', 'popular']);
 
export const countries = pgTable('countries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  longName: varchar('long_name', { length: 256 })
}, (countries) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(countries.name),
  }
});
 
export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  stateId: integer('state_id').references(() => states.id),
  countryId: integer('country_id').references(() => countries.id),
  popularity: popularityEnum('popularity'),
});

export const states = pgTable('states', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  abbrev: varchar('abbrev', { length: 128 }),
  countryId: integer('country_id').references(() => countries.id),
})