import { db } from "@/db";
import { countries } from "@/db/schema";

export async function GET() {
    
    // db.insert(countries).values({name: "United Kingdom"}).run()
    
    const countriesList = db.select().from(countries).all()

    return Response.json(countriesList)
}

export const dynamic = 'force-dynamic'