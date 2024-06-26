import { createSrtFile } from "@/lib/create_srtFile";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
    const res = await req.json()
    console.log(res, "bhai mera raes")
    const text = res.text
    const videoDur = res.time
    if(!text || !videoDur){
        Response.json({
            message: "No text found, Please send the text"
        })
    }
    createSrtFile(text, videoDur)
    return Response.json({message: "done, srt file created"});
}