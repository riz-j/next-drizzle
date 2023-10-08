import { db } from "@/db";
import { CountryInsert, countries } from "@/db/schema";
import { DatabaseEmitter, NotificationEvent, PayloadType } from "@/utils/databaseEmitter";
import { NotificationSome } from "@/utils/databaseEmitter";

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
        payload: newCountry,
        payloadType: PayloadType.Country
    }
    emitter.emit("message", notification)

    return Response.json(newCountry, { status: 201 })
}


export async function GET(req: Request, res: Response) {
    let responseStream = new TransformStream()
    const writer = responseStream.writable.getWriter()
    const encoder = new TextEncoder()
    let closed = false 
    const emitter = DatabaseEmitter.getInstance()
    
    const writeData = (data: string) => {
        if (!closed) {
            writer.write(encoder.encode(`data: ${data}\n\n`));
        }
    };
    
    emitter.on("message", (data) => {
        writeData(JSON.stringify(data))
    })
    
    return new Response(responseStream.readable, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    })
}