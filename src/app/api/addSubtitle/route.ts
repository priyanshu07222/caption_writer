import { NextRequest } from "next/server";
import ffmpegInstaller from 'ffmpeg-static'
import ffmpeg from "fluent-ffmpeg";

ffmpeg.setFfmpegPath('C:\\ffmpeg\\bin\\ffmpeg.exe')

export async function POST(req: NextRequest) {
  const videoUrl = await req.text()

  if(!videoUrl){
    return Response.json({
      message: "videoUrl not found"
    })
  }
  console.log(videoUrl)
  try {
    await addSubtitlesToVideo(
      "http://res.cloudinary.com/dptgkunzk/video/upload/v1718306671/ui5euapr8biargbotd5v.mp4",
      "./public/srtfile/output.srt",
      "./public/videoWithSub/givemeewrd.mp4"
    );
  } catch (error) {
    console.log("Something went wrong while adding subtitle");
  }

  return Response.json({ message: "subtitle added successfully" });
}

async function addSubtitlesToVideo(
  videoFilePath: string,
  srtFilePath: string,
  outputFilePath: string
): Promise<void> {
    return new Promise((resolve, reject) => {
        ffmpeg(videoFilePath)
        .outputOptions('-vf', `subtitles=${srtFilePath}: force_style= 'PrimaryColour=&H00FFFF00,Alignment=2'`)
        .save(outputFilePath)
      .on('end', () => {
        console.log('Subtitles added to video:', outputFilePath);
        resolve();
      })
      .on('error', (err) => {
        console.error('Error adding subtitles:', err);
        reject(err);
      });
    })
}
