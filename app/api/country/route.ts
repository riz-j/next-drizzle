import { db } from '@/app/db'
import { countries } from '@/app/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const countryId = parseInt(url.searchParams.get('id') || '0')

    const country = (await db
        .select()
        .from(countries)
        .where(eq(countries.id, countryId))
    )[0]

    return Response.json(country);
}