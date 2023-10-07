import { db } from "@/db"
import { CountryInsert, countries } from "@/db/schema"
import { prepareForPatch } from "@/utils/patch"
import { eq } from "drizzle-orm"

export async function GET(
    request: Request,
    { params }: { params: { slug: number } }    
) {
    const countryId = params.slug
    const country = await db.select().from(countries).where(eq(countries.id, countryId))

    return Response.json(country)
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