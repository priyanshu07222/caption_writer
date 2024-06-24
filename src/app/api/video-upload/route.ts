import dbConnect from "@/lib/dbConnect";
import Video from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";
import { v2 as cloudinary } from "cloudinary";
import fs, { existsSync } from "fs";
import multer from "multer";
import { createReadStream } from "streamifier";
import { uploadOnCloudinary } from "@/lib/uploadVideo";
import path from "path";

export async function POST(req: NextRequest) {
  await dbConnect();

  const srtFilePath = path.join(
    process.cwd(),
    "public",
    "srtfile",
    "output.srt"
  );

  const videoWithSubtitlesPath = path.join(
    process.cwd(),
    "public",
    "videoWithSub",
    "givemeewrd.mp4"
  );

  try {
    // if (existsSync(srtFilePath)) {
    //   fs.unlinkSync(srtFilePath);
    // }

    if (existsSync(videoWithSubtitlesPath)) {
      fs.unlinkSync(videoWithSubtitlesPath);
    }

    const res = await req.formData();
    const videoUrl = res.get("url") as File;
    const arrayBuffer = await videoUrl.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const cloudinaryResponse = (await uploadOnCloudinary(buffer)) as {
      duration: number;
      url: string;
    };
    const url = cloudinaryResponse.url;
    const videoDuration = Math.ceil(cloudinaryResponse.duration);

    const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);

    // STEP 2: Call the transcribeUrl method with the audio payload and options
    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
      { url: url },
      // STEP 3: Configure Deepgram options for audio analysis
      {
        model: "nova-2",
        smart_format: true,
        detect_language: true,
      }
    );

    if (error) throw error;
    // STEP 4: Print the results
    // const wordsArray = result.results.channels[0].alternatives[0].words
    // const para = result.results.channels[0].alternatives[0].paragraphs
    const text = result.results.channels[0].alternatives[0].transcript;
    if (!error)
      // console.log(text)

      // console.log(para)

      return Response.json({
        message: "successfully done hoga",
        text,
        url,
        videoDuration,
      });
  } catch (error: any) {
    console.log("Error is happening", error);
    Response.json({
      error: error.message,
    });
  }
}
