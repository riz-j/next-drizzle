import { db } from "@/db";
import { StateInsert, countries, states } from "@/db/schema";
import { eq, like } from "drizzle-orm";

export async function GET() {
    const statesList = await db
        .select()
        .from(states)
        .leftJoin(countries, eq(states.countryId, countries.id))

    const formattedStates = statesList.map(({ states, ...rest }) => ({ ...states, ...rest }));

    return Response.json(formattedStates)
}

export async function POST(request: Request) {
    const stateInsert: StateInsert = await request.json()
    delete stateInsert.id

    const insertedState = await db.insert(states).values(stateInsert).returning()

    return Response.json(insertedState, { status: 201 })
}

export const dynamic = 'force-dynamic'