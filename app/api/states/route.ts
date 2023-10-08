import { db } from "@/db";
import { StateInsert, countries, states } from "@/db/schema";
import { prepareForPost } from "@/utils/post";
import { wild } from "@/utils/query";
import { SQLWrapper, and, eq, like } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id')
    const countryId = request.nextUrl.searchParams.get('countryId')
    const name = request.nextUrl.searchParams.get('name')
    const abbrev = request.nextUrl.searchParams.get('abbrev')

    const conditions: (SQLWrapper | undefined)[] = []

    if (countryId) { conditions.push(eq(states.countryId, parseInt(countryId))) }
    if (id) { conditions.push(eq(states.id, parseInt(id))) }
    if (name) { conditions.push(like(states.name, wild(name))) }
    if (abbrev) { conditions.push(eq(states.abbrev, abbrev.toUpperCase())) }

    const statesList = await db.select().from(states)
        .leftJoin(countries, eq(states.countryId, countries.id))
        .where(and(...conditions))
        
    const formattedResults = statesList.map(({ states, ...rest }) => ({ ...states, ...rest }));

    return Response.json(formattedResults)
}

export async function POST(request: Request) {
    const stateInsert = prepareForPost<StateInsert>(await request.json())

    const insertedState = await db.insert(states).values(stateInsert).returning()

    return Response.json(insertedState, { status: 201 })
}

export const dynamic = 'force-dynamic'