import { db } from "@/db";
import { cities, countries, states } from "@/db/schema";
import { eq, like } from "drizzle-orm";

export async function GET() {

    const citiesList = await db
        .select()
        .from(cities)
        .leftJoin(states, eq(cities.stateId, states.id))
        .leftJoin(countries, eq(states.countryId, countries.id))

    const formattedResult = citiesList.map(({ cities, ...rest}) => ({ ...cities, ...rest }))

    return Response.json(formattedResult)
}

export const dynamic = 'force-dynamic'