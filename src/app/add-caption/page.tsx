"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import translateText from "./translateText";
import { createSrt } from "./createSrt";
import { subVideo } from "./subVideo";
function addCaption() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const text = searchParams.get("text") as string;
  const videoLength = searchParams.get("videoLength");
  const [translatedText, setTranslatedText] = useState<string | null>(null);

  useEffect(() => {
    if (text) {
      const fetchTranslation = async () => {
        try {
          const translation = await translateText(text, "cs");
          setTranslatedText(translation);
        } catch (error) {
          console.error("Error translating text:", error);
        }
      };

      fetchTranslation();
    }
  }, [text]);

  useEffect(() => {
    if (translatedText) {
      const fetchSrt = async () => {
        try {
          const data = await createSrt(translatedText, Number(videoLength));
        } catch (error) {
          console.log("error while fetching srt file");
        }
      };

      fetchSrt();
    }
  }, [translatedText]);

  useEffect(() => {
    console.log("yaha1");
    if (url) {
      console.log("yaha 2", url);
      const fetchSubVideo = async () => {
        console.log("yaha3");
        try {
          console.log("yaha4");
          const res = await subVideo(url);
          console.log("yaha5");
        } catch (error) {
          console.log("Error while fetch subvideo", error);
        }
      };
      fetchSubVideo();
    }
  }, []);

  return (
    <div className="flex justify-evenly container max-w-screen-xl mx-auto h-screen">
      {url && (
        <div className="m-4">
          <h3 className="mb-4 text-center">Before</h3>
          <video src={url} controls width="200" className="max-w-lg"></video>
        </div>
      )}
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
          <a href='/videoWithSub/givemeewrd.mp4' download="output-with-subtitles.mp4" className="bg-green-600 px-4 py-2 rounded-2xl ">
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default addCaption;
