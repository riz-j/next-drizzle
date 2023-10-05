import { db } from "@/app/db";
import { cities, countries, popularityEnum, states } from "@/app/db/schema";
import { eq, like } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const country = (await db
        .select({id: countries.id})
        .from(countries)
        .where(like(countries.name, '%Indonesia%'))
    )[0]

    // await db
    //     .insert(cities)
    //     .values({
    //         name: "Las Vegas",
    //         countryId: country.id
    //     })

    // const insertedState = (await db
    //     .insert(states)
    //     .values({ name: 'DKI Jakarta', countryId: country.id })
    //     .returning()
    // )[0]
    // await db.update(cities).set({ stateId: insertedState.id }).where(like(cities.name, 'Jakarta'))


    const citiesList = await db
        .select({
            id: cities.id,
            city: cities,
            state: states,
            country: countries
        })
        .from(cities)
        .leftJoin(countries, eq(countries.id, cities.countryId))
        .leftJoin(states, eq(countries.id, states.countryId))

    return Response.json(citiesList)
}