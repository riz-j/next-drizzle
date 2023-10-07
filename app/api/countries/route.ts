import { db } from "@/app/db";
import { countries } from "@/app/db/schema";

export async function GET() {
    
    db.insert(countries).values({name: "United States"}).run()
    
    const countriesList = db.select().from(countries).all()

    return Response.json(countriesList)
}

export const dynamic = 'force-dynamic'