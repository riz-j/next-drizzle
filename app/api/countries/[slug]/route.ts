import { db } from "@/db"
import { CitySelect, CountryInsert, StateSelect, cities, countries, states } from "@/db/schema"
import { prepareForPatch } from "@/utils/patch"
import { eq } from "drizzle-orm"
import { useSearchParams } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: number } }    
) {    
    const countryId = params.slug

    let result: any = {}
    let statesList: StateSelect[] = []
    let citiesList: CitySelect[] = []

    const country = (await db
        .select()
        .from(countries)
        .where(eq(countries.id, countryId))
    )[0]

    if (country == null) { return Response.json({ message: "Not found" }, { status: 404 })}

    result = country

    if (request.nextUrl.searchParams.get('states')) {
        statesList = await db.select().from(states).where(eq(states.countryId, countryId))
        result.states = statesList
    }

    if (request.nextUrl.searchParams.get('cities')) {
        if (statesList.length == 0) {
            statesList = await db.select().from(states).where(eq(states.countryId, countryId))
        }
        for (const state of statesList) {
            const someCities = await db.select().from(cities).where(eq(cities.stateId, state.id))
            citiesList.push(...someCities);
        }
        result.cities = citiesList
    }

    return Response.json(result)
}

export async function PATCH(
    request: Request,
    { params }: { params: { slug: number } }
) {
    const countryId = params.slug
    const countryInsert = prepareForPatch<CountryInsert>(await request.json())

    await db.update(countries).set(countryInsert).where(eq(countries.id, countryId))

    return new Response(null, { status: 204 })
}

export async function DELETE(
    request: Request,
    { params }: { params: { slug: number } }
) {
    const countryId = params.slug
    const country = (await db.select().from(countries).where(eq(countries.id, countryId)))[0]

    if (country == null) {
        return Response.json({ message: "Not found" }, { status: 404 })
    }

    await db.delete(countries).where(eq(countries.id, countryId))

    return new Response(null, { status: 204 })
}

export const dynamic = 'force-dynamic'