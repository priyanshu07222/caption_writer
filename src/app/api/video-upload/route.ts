import dbConnect from "@/lib/dbConnect";
import Video from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import { createReadStream } from "streamifier";
import { uploadOnCloudinary } from "@/lib/uploadVideo";


export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const res = await req.formData();
    const videoUrl = res.get("video_url") as File;
    const {url} = await uploadOnCloudinary(videoUrl) as Response
  

    const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);

    // STEP 2: Call the transcribeUrl method with the audio payload and options
    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
      {url: url},
      // STEP 3: Configure Deepgram options for audio analysis
      {
        model: "nova-2",
        smart_format: true,
        detect_language: true,
      }
    );

    if (error) throw error;
    // STEP 4: Print the results
    const text = result.results.channels[0].alternatives[0].transcript
    if (!error)
      console.dir(text, {
        depth: null,
      });

    return Response.json({
      message: "successfully done hoga",
      text
    });
  } catch (error: any) {
    console.log("Error is happening", error);
    Response.json({
      error: error.message
    })
  }
}
