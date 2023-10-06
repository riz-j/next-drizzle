import { db } from "@/app/db";
import { cities, countries, popularityEnum, states } from "@/app/db/schema";
import { eq, like } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    
    // db.transaction(async (tx) => {
    //     const country = (await tx.select().from(countries).where(like(countries.name, '%Indonesia%')))[0]
    //     const newState = (await tx.insert(states).values({ name: "DKI Jakarta", abbrev: "DKI", countryId: country.id }).returning())[0]
    
    //     await tx.update(cities).set({ stateId: newState.id }).where(eq(cities.name, 'Jakarta'))
    //     await tx.update(cities).set({ stateId: newState.id }).where(eq(cities.name, 'Surabaya'))
    // })
    
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

export const dynamic = 'force-dynamic'