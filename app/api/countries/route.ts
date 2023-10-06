import { db } from "@/app/db";
import { countries } from "@/app/db/schema";

export async function GET() {
    const countriesList = await db.select().from(countries)

    return Response.json(countriesList)
}

export const dynamic = 'force-dynamic'