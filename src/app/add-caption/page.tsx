"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import translateText from "./translateText";
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

  return (
    <div>
      {url && (
        <div>
          <h3 className="mb-4">Uploaded Video on cloudinary</h3>
          {/* {text && <p>{text}</p>} */}
          <video src={url} controls width="200" className="max-w-lg"></video>
        </div>
      )}
    </div>
  );
}

export default addCaption;
