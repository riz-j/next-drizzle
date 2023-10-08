import { databaseEmitter } from "@/utils/databaseEmitter";

export async function GET() {
    let responseStream = new TransformStream()
    const writer = responseStream.writable.getWriter()
    const encoder = new TextEncoder()
    
    const writeData = (data: string) => {
        writer.write(encoder.encode(`data: ${data}\n\n`)); 
    };
    
    databaseEmitter.on("message", (data) => {
        writeData(JSON.stringify(data))
    })
    
    return new Response(responseStream.readable, {
        status: 200,
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    })
}

export const dynamic = 'force-dynamic'