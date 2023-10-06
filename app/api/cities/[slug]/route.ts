import { db } from '@/app/db';
import { cities, countries, states } from '@/app/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
    request: Request,
    { params }: { params: { slug: number } }
) {
    const cityId = params.slug

    if (isNaN(cityId) || cityId <= 0) {
        return Response.json({ message: 'Invalid format' }, { status: 400 })
    }

    const city = (await db
        .select()
        .from(cities)
        .where(eq(cities.id, cityId))
        .leftJoin(states, eq(cities.stateId, states.id))
        .leftJoin(countries, eq(cities.countryId, countries.id))
    )[0]

    if (city == null) {
        return Response.json({ message: 'City not found' }, { status: 404 })
    }

    return Response.json({ id: city.cities.id, ...city })
}

export const dynamic = 'force-dynamic'