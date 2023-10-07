import { db } from "@/db";
import { countries, states } from "@/db/schema";
import { eq, like } from "drizzle-orm";

export async function GET() {

    // const country = (await db
    //     .select({ id: countries.id })
    //     .from(countries)
    //     .where(like(countries.name, '%United States%'))
    // )[0]
    
    // await db.insert(states).values({ name: 'Kansas', countryId: country.id })

    const statesList = await db.select().from(states).leftJoin(countries, eq(states.countryId, countries.id))
    const formattedStates = statesList.map(({ states, ...rest }) => ({ ...states, ...rest }));

    return Response.json(formattedStates)
}