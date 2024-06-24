"use client";
import React, { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import addCaption from "@/app/add-caption/page";
import { useRouter } from "next/navigation";
import { FiCommand } from "react-icons/fi";

function HeroSection() {
  const [url, setUrl] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [videoDuration, setVideoDuration] = useState<number>();
  const [videoUrlCloudinary, setVideoUrlCloudinary] = useState<string>("");
  const [selectedLang, setSelectedLang] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null);

  

  const router = useRouter();

  const supportedLangArray = [
    { arabic: "ar" },
    { bulgarian: "bg" },
    { czech: "cs" },
    { danish: "da" },
    { german: "de" },
    { greek: "el" },
    { "english (UK)": "en-GB" },
    { "english (US)": "en-US" },
    { spanish: "es" },
    { estonian: "et" },
    { finnish: "fi" },
    { french: "fr" },
    { hungarian: "hu" },
    { indonesian: "id" },
    { italian: "it" },
    { japanese: "ja" },
    { korean: "ko" },
    { lithuanian: "lt" },
    { latvian: "lv" },
    { norwegian: "nb" },
    { dutch: "nl" },
    { polish: "pl" },
    { "portuguese (Brazil)": "pt-Br" },
    { "portuguese (Portugal)": "pt-PT" },
    { romanian: "ro" },
    { russian: "ru" },
    { slovenian: "sl" },
    { swedish: "sv" },
    { turkish: "tr" },
    { ukrainian: "uk" },
    { chinese: "zh" },
  ];
  

  const handleChange = (e: any) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        setError('Please select a valid video file.');
        e.target.value = ''; // Clear the selected file
        setUrl("");
      } else {
        setError('');
        setUrl(file);
        // Handle the video file upload here
        console.log('Selected file:', file);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const formData = new FormData();
      formData.append("url", url);

      const response = await axios.post("/api/video-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("Response:", response.data);
      setVideoUrlCloudinary(response.data.url);
      setText(response.data.text);
      setVideoDuration(response.data.videoDuration);
      setIsLoading(false)
    } catch (error) {
      console.error("Error uploading file URL:", error);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const callCaption = () => {
    const queryParams = new URLSearchParams({
      url: videoUrlCloudinary,
      text: text,
      videoLength: String(videoDuration),
      selectedLang: selectedLang
    });
    router.push(`/add-caption?${queryParams.toString()}`);
  };

  return (
    <>
      <div className=" w-full rounded-md relative flex flex-col items-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Add the Subtitle
          </h1>
          <p></p>
          <p className="text-neutral-500 max-w-lg mx-auto mt-4 mb-4 text-md text-center relative z-10">
            Welcome to Caption.Og, the best subtile embedding software on the
            web. We provide reliable, scalable, and customizable subtile
            generation for your Video. Just give us the video.
          </p>

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="file_input"
              className="block mb-2 text-md font-medium text-gray-100"
            >
              Upload video
            </label>
            <input
              type="file"
              ref={fileInputRef}
              placeholder="Select the video"
              accept="video/*"
              onChange={handleChange}
              className="block mb-2 p-2 cursor-pointer rounded-full border text-purple-500 border-neutral-800 focus:ring-2  w-full relative z-10 mt-2  bg-neutral-950  placeholder:text-neutral-700 file:bg-purple-600 file:rounded-full file:py-2 file:px-4 file:border-none file:text-gray-100 file:mr-32"
            />

            <div className="flex justify-end relative">
              
              <button
                type="submit"
                className={`bg-black relative z-10 border border-white rounded-full py-2 px-4 dark:bg-slate-900 text-gray-100 dark:text-white dark:border-slate-800 ${url ? `cursor-pointer active:bg-blue-700 active:text-xl` : `cursor-no-drop`  } ${isLoading ? `cursor-not-allowed active:bg-black active:text-base` :  `cursor-pointer`}  `}
                disabled={!url || isLoading}
                
              >
                submit
              </button>
            </div>
          </form>

          {isLoading && (
            <div className="flex flex-col gap-4 justify-center items-center h-24 mt-24">
              <FiCommand className="rotate-180 h-20 w-20 animate-spin"/>
              <p>Processing, please wait<span className="animate-ping transition-all ease-in-out font-extrabold text-xl" >...</span></p>
            </div>
          )}

          {videoUrlCloudinary && (
            <div className="m-4 flex justify-between">
              <video
                src={videoUrlCloudinary}
                controls
                width="200"
                className="max-w-lg"
              ></video>

              <div className="flex flex-col justify-center items-center  relative z-10 ">
                <div className="flex flex-col gap-3">
                  <label htmlFor="lang" className="text-md font-sans font-semibold">Select a language:</label>
                  <select
                    id="lang"
                    value={selectedLang}
                    onChange={(e) => {
                      setSelectedLang(e.target.value);
                    }}
                    className=" p-2 rounded-full border-none outline-none bg-gray-600 text-white"
                  >
                    {supportedLangArray.map((lang, index) => (
                      <option key={index} value={Object.values(lang)[0]}>
                        {Object.keys(lang)[0]}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm font-sans font-semibold">Selected language: {selectedLang}</p>
                </div>
                <button
                  onClick={() => callCaption()}
                  className={`bg-black my-6 transition-all relative z-10 border border-white rounded-full py-2 px-4 dark:bg-slate-900 text-gray-100 dark:text-white dark:border-slate-800  ${selectedLang ? `cursor-pointer active:bg-blue-700 active:text-xl` : `cursor-not-allowed bg-black text-base`}`}
                  disabled = {!selectedLang}
                >
                  apply caption
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HeroSection;
