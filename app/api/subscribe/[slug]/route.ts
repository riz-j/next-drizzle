import { db } from "@/db";
import { countries } from "@/db/schema";
import { wildRight } from "@/utils/query";
import { and, like } from "drizzle-orm";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug;

    const country = await db.query.countries.findMany({
        where: and(
            like(countries.name, wildRight(slug))
        )
    })

    if (country == null) {
        return Response.json({ message: "Not found" }, { status: 404 })
    }

    return Response.json(country)
}