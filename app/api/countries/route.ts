import { db } from "@/db";
import { CountryInsert, countries } from "@/db/schema";
import { DatabaseEmitter, NotificationEvent, NotificationSome, PayloadType } from "@/utils/databaseEmitter";
import { wild } from "@/utils/query";
import { SQLWrapper, and, eq, like } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id')
    const name = request.nextUrl.searchParams.get('name')
    const longName = request.nextUrl.searchParams.get('longName')

    const conditions: (SQLWrapper | undefined)[] = []

    if (id) { conditions.push(eq(countries.id, parseInt(id))) }
    if (name) { conditions.push(like(countries.name, wild(name))) }
    if (longName) { conditions.push(like(countries.longName, wild(longName))) }

    const countriesList = await db
        .select()
        .from(countries)
        .where(and(...conditions))

    return Response.json(countriesList)
}

export async function POST(request: Request) {
    const emitter = DatabaseEmitter.getInstance()

    const countryInsert: CountryInsert = await request.json()
    delete countryInsert.id 

    const newCountry = (await db
        .insert(countries)
        .values(countryInsert)
        .returning()
    )[0]
        
    const notification: NotificationSome = {
        id: newCountry.id,
        event: NotificationEvent.Insert,
        payloadType: PayloadType.Country,
        payload: newCountry
    }
    emitter.emit("message", notification)

    return Response.json(newCountry, { status: 201 })
}

export const dynamic = 'force-dynamic'