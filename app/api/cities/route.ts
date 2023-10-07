import { db } from "@/db";
import { CityInsert, cities, countries, states } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {

    const citiesList = await db
        .select()
        .from(cities)
        .leftJoin(states, eq(cities.stateId, states.id))
        .leftJoin(countries, eq(states.countryId, countries.id))

    const formattedResult = citiesList.map(({ cities, ...rest}) => ({ ...cities, ...rest }))

    return Response.json(formattedResult)
}

export async function POST(request: Request) {
    const cityInsert: CityInsert = await request.json()
    delete cityInsert.id

    const insertedCity =  (await db
        .insert(cities)
        .values(cityInsert)
        .returning()
    )[0]

    return Response.json(insertedCity, { status: 201 })
}

export const dynamic = 'force-dynamic'