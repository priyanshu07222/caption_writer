"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import translateText from "./translateText";
import { createSrt } from "./createSrt";
function addCaption() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const text = searchParams.get("text") as string;
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

  console.log("mmomy")

  useEffect(() => {
    console.log("moonby start")
    if(translatedText){
      console.log(translatedText,"moonby starting")
      const fetchSrt = async () => {
        try {
          console.log("enter into srt file ")
          const data = await createSrt(translatedText, 50)
        } catch (error) {
          console.log("error while fetching srt file")
        }
      }

      fetchSrt()
    }
  }, [translatedText])

  console.log("end")

  return (
    <div>
      {url && (
        <div>
          <h3 className="mb-4">Uploaded Video on cloudinary</h3>
          <p>{translatedText}</p>
          {text && <p>{text}</p>}
          <video src={url} controls width="200" className="max-w-lg"></video>
        </div>
      )}
    </div>
  );
}

export default addCaption;
