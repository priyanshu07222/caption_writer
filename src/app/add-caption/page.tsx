"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import translateText from "./translateText";
import { createSrt } from "./createSrt";
import { subVideo } from "./subVideo";
import { FiCommand } from "react-icons/fi";

function AddCaption() {
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
    <div className="flex flex-col sm:flex-row sm:justify-evenly container max-w-screen-xl mx-auto sm:h-screen">
      {url && (
        <div className="m-4 flex flex-col justify-center items-center sm:justify-normal sm:items-start">
          <h3 className="mb-4 text-center text-xl">Before</h3>
          <video src={url} controls width="200" className="max-w-lg"></video>
        </div>
      )}

      {subVid ? (
        <div className="m-4 flex flex-col justify-center items-center sm:justify-normal sm:items-start ">
          <h3 className="mb-4 text-center text-xl">After</h3>
          <video
            src="/videoWithSub/givemeewrd.mp4"
            controls
            width="200"
            className="max-w-lg m-4 sm:m-0"
          ></video>
          {/* ------ */}
          <div className="my-12 sm:my-8">
            <a
              href="/videoWithSub/givemeewrd.mp4"
              download="output-with-subtitles.mp4"
              className="bg-green-600 px-8 py-4 rounded-2xl text-lg "
            >
              Download
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center pt-36 gap-6 mb-4">
          <p className="font-semibold text-xl ">Processing, Please wait</p>
          <span><FiCommand className="rotate-180 h-16 w-16 animate-spin"/></span>
        </div>
      )}
    </div>
  );
}

export default AddCaption;
