import { databaseEmitter } from "@/utils/databaseEmitter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: NextResponse) {
    let responseStream = new TransformStream()
    const writer = responseStream.writable.getWriter()
    const encoder = new TextEncoder()
    let closed = false 
    
    databaseEmitter.on("message", (data) => {
        // writer.write(encoder.encode("data: " + data.data + "\n\n"))
        console.log(data.data)
    })

    setInterval(() => {
        writer.write(encoder.encode("data: " + "Hello World!" + "\n\n"))
    }, 1500)

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