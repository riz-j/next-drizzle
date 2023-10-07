import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const countries = sqliteTable('countries', {
    id: integer('id').primaryKey(),
    name: text('name'),
    longName: text('long_name')
  }, (countries) => ({
    nameIdx: uniqueIndex('nameIdx').on(countries.name),
  })
);

export type CountryInsert = InferInsertModel<typeof countries>
export type SelectCountry = InferSelectModel<typeof countries>

export const states = sqliteTable('states', {
    id: integer('id').primaryKey(),
    name: text('name'),
    abbrev: text('abbrev'),
    countryId: integer('country_id').references(() => countries.id)
  }, (states) => ({
    stateCountryNameIdx: uniqueIndex('state_country_name_idx').on(states.countryId, states.name)
  })
);

export type StateInsert = InferInsertModel<typeof states>

export const cities = sqliteTable('cities', {
    id: integer('id').primaryKey(),
    name: text('name'),
    stateId: integer('state_id').references(() => states.id),
  }, (cities) => ({
    cityStateNameIdx: uniqueIndex('city_state_name_idx').on(cities.name, cities.stateId)
  })
);

export type CityInsert = InferInsertModel<typeof cities>