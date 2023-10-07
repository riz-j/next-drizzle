import { db } from "@/db";
import { CountryInsert, countries } from "@/db/schema";

export async function GET() {
    const countriesList = await db
        .select()
        .from(countries)

    return Response.json(countriesList)
}

export async function POST(request: Request) {
    const countryInsert: CountryInsert = await request.json()

    const newCountry = await db
        .insert(countries)
        .values(countryInsert)
        .returning()

    return Response.json(newCountry, { status: 201 })
}

export const dynamic = 'force-dynamic'