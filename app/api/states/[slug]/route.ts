import { db } from "@/db"
import { StateInsert, countries, states as db_states } from "@/db/schema"
import { prepareForPatch } from "@/utils/patch"
import { eq } from "drizzle-orm"

export async function GET(
    request: Request,
    { params }: { params: { slug: number } }
) {
    const stateId = params.slug

    const state = (await db
        .select()
        .from(db_states)
        .where(eq(db_states.id, stateId))
        .leftJoin(countries, eq(db_states.countryId, countries.id))
    )[0]

    if (state == null) {
        return Response.json({ message: "Not found" }, { status: 404 })
    } 

    const { states, ...rest } = state

    return Response.json({ ...states, ...rest })
}

export async function PATCH(
    request: Request,
    { params }: { params: { slug: number } }
) {
    const stateId = params.slug
    const stateInsert = prepareForPatch<StateInsert>(await request.json())

    await db.update(db_states).set(stateInsert).where(eq(db_states.id, stateId))

    return new Response(null, { status: 204 })
}

export async function DELETE(
    request: Request,
    { params }: { params: { slug: number } }
) {
    const stateId = params.slug

    const deletedState = await db.delete(db_states).where(eq(db_states.id, stateId))

    if (deletedState.changes == 0) {
        return Response.json({ message: "Nothing deleted" }, { status: 400 })
    }

    return new Response(null, { status: 204 })
}

export const dynamic = 'force-dynamic'