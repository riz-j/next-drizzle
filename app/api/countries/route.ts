import { db } from "@/app/db";
import { countries } from "@/app/db/schema";
import { NextRequest } from "next/server";

export default async function GET(request: NextRequest) {
    const countriesList = await db.select().from(countries);

    return Response.json(countriesList);
}