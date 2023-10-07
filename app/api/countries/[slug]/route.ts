import { db } from "@/db"
import { CountryInsert, countries } from "@/db/schema"
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
    const countryInsert: CountryInsert = await request.json()

    if (countryInsert.name) { 
        await db.update(countries).set({ name: countryInsert.name }).where(eq(countries.id, countryId))
    }
    
    if (countryInsert.longName) {
        await db.update(countries).set({ longName: countryInsert.longName }).where(eq(countries.id, countryId))
    }

    return new Response(null, { status: 204 })
}

export async function DELETE(
    request: Request,
    { params }: { params: { slug: number } }
) {
    const countryId = params.slug

    await db.delete(countries).where(eq(countries.id, countryId))

    return new Response(null, { status: 204 })
} 

export const dynamic = 'force-dynamic'