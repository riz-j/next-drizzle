import { db } from "@/db";
import { states } from "@/db/schema";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug;

    const results = await db.query.countries.findMany()

    return Response.json(results)
}