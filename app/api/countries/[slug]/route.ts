import { db } from "@/db"
import { CountryInsert, countries } from "@/db/schema"
import { prepareForPatch } from "@/utils/patch"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

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

    await db.delete(countries).where(eq(countries.id, countryId))

    return new Response(null, { status: 204 })
} 

function validateInput(insertModel: any, updateModel: any) {
    if (insertModel.id != null) { 
        return Response.json({ message: "ID must be null" }, { status: 400 }) 
    }

    for (const prop in insertModel) {
        if (!(prop in updateModel)) {
            return Response.json({ message: `Property '${prop}' is not valid` }, { status: 400 })
        }
    }

    for (const prop in updateModel) {
        if (!(prop in insertModel)) {
            return Response.json({ message: `Property '${prop}' in is not val id` }, { status: 400 });
        }
    }

    return null
}

export const dynamic = 'force-dynamic'