import { db } from "@/db";
import { StateInsert, countries, states } from "@/db/schema";
import { wild } from "@/utils/query";
import { eq, like } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id')
    const countryId = request.nextUrl.searchParams.get('countryId')
    const name = request.nextUrl.searchParams.get('name')
    const abbrev = request.nextUrl.searchParams.get('abbrev')

    const query = db.select().from(states)
        .leftJoin(countries, eq(states.countryId, countries.id))

    if (countryId) { query.where(eq(states.countryId, parseInt(countryId))) }
    if (id) { query.where(eq(states.id, parseInt(id))) }
    if (name) { query.where(like(states['name'], wild(name))) }
    if (abbrev) { query.where(eq(states.abbrev, abbrev.toUpperCase())) }

    const statesList = await query
    const formattedResults = statesList.map(({ states, ...rest }) => ({ ...states, ...rest }));

    return Response.json(formattedResults)
}

export async function POST(request: Request) {
    const stateInsert: StateInsert = await request.json()
    delete stateInsert.id

    const insertedState = await db.insert(states).values(stateInsert).returning()

    return Response.json(insertedState, { status: 201 })
}

export const dynamic = 'force-dynamic'