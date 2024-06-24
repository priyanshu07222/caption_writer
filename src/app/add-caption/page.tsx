"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import translateText from "./translateText";
import { createSrt } from "./createSrt";
import { subVideo } from "./subVideo";
import { FiCommand } from "react-icons/fi";

function addCaption() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const text = searchParams.get("text") as string;
  const videoLength = searchParams.get("videoLength");
  const selectedLang = searchParams.get("selectedLang");
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [subVid, setSubVid] = useState<boolean>(false);

  useEffect(() => {
    const processVideo = async () => {
      try {
        if (text) {
          const translation = await translateText(
            text,
            selectedLang || "en-US"
          );
          setTranslatedText(translation);
          // console.log("Translation fetched");

          // console.log("Creating SRT file");
          const srtData = await createSrt(translation, Number(videoLength));
          // console.log("SRT file created");

          if (url) {
            // console.log("Adding subtitles to video");
            const subVidResponse = await subVideo(url);
            // console.log("sub3", subVidResponse);
            if (subVidResponse.message === "done") {
              setSubVid(true);
            }

            // console.log("Subtitles added", subVidResponse);
          }
        }
      } catch (error) {
        console.error("Error during processing", error);
      }
    };

    processVideo();
  }, []);


  return (
    <div className="flex justify-evenly container max-w-screen-xl mx-auto h-screen">
      {url && (
        <div className="m-4">
          <h3 className="mb-4 text-center">Before</h3>
          <video src={url} controls width="200" className="max-w-lg"></video>
        </div>
      )}

      {subVid ? (
        <div className="m-4">
          <h3 className="mb-4 text-center">After</h3>
          <video
            src="/videoWithSub/givemeewrd.mp4"
            controls
            width="200"
            className="max-w-lg m-4"
          ></video>
          {/* ------ */}
          <div>
            <a
              href="/videoWithSub/givemeewrd.mp4"
              download="output-with-subtitles.mp4"
              className="bg-green-600 px-4 py-2 rounded-2xl "
            >
              Download
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center pt-36 gap-6 ">
          <p className="font-semibold text-xl">Processing, Please wait</p>
          <span><FiCommand className="rotate-180 h-16 w-16 animate-spin"/></span>
        </div>
      )}
    </div>
  );
}

export default addCaption;
