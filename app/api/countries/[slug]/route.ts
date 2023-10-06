import { db } from '@/app/db';
import { countries } from '@/app/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
    request: Request,
    { params }: { params: { slug: number } }
) {
    const countryId = params.slug
    const country = (await db
        .select()
        .from(countries)
        .where(eq(countries.id, countryId))
    )[0]

    return Response.json(country)
}

export const dynamic = 'force-dynamic'

