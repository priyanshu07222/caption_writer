import { NextRequest } from "next/server";
import ffmpegInstaller from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe");

let isProcessing = false;

export async function POST(req: NextRequest) {
  const op = await req.json();
  const videoUrl = op.videoUrl;

  // console.log(op,"111")
  // console.log(videoUrl,"32")

  if (!videoUrl) {
    return Response.json({
      message: "videoUrl not found",
    });
  }

  if (isProcessing) {
    return Response.json({
      error: "Another process is already running. Please try again later.",
    });
  }

  isProcessing = true;
  // console.log(videoUrl,"22")
  try {
    console.log("dahr")
    await addSubtitlesToVideo(
      videoUrl,
      "./public/srtfile/output.srt",
      "./public/videoWithSub/givemeewrd.mp4"
    );

    console.log("dahr22")

    await confirmFileWritten("./public/videoWithSub/givemeewrd.mp4");
    console.log("done")
  } catch (error) {
    isProcessing = false;
    console.error("Something went wrong while adding subtitle", error);
    return Response.json({
      error: "Something went wrong while adding subtitle",
    });
  } finally {
    isProcessing = false
  }

  return Response.json({ message: "done" });
}

async function addSubtitlesToVideo(
  videoFilePath: string,
  srtFilePath: string,
  outputFilePath: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(videoFilePath)
      .outputOptions(
        "-vf",
        `subtitles=${srtFilePath}: force_style= 'PrimaryColour=&H00FFFF00,Alignment=2'`
      )
      .save(outputFilePath)
      .on("end", () => {
        console.log("Subtitles added to video:", outputFilePath);
        resolve();
      })
      .on("error", (err) => {
        console.error("Error adding subtitles:", err);
        reject(err);
      });
  });
}

async function confirmFileWritten(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const checkFileInterval = setInterval(() => {
      if (fs.existsSync(filePath)) {
        clearInterval(checkFileInterval);
        resolve();
      }
    }, 500);

    // Set a timeout to reject if file is not written within a reasonable time
    setTimeout(() => {
      clearInterval(checkFileInterval);
      reject(new Error("File write timeout"));
    }, 30000); // 30 seconds timeout
  });
}
