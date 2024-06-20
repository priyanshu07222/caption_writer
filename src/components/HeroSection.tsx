"use client";
import React, { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import addCaption from "@/app/add-caption/page";
import { useRouter } from "next/navigation";

function HeroSection() {
  const [url, setUrl] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [videoDuration, setVideoDuration] = useState<number>()
  const [videoUrlCloudinary, setVideoUrlCloudinary] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    setUrl(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("ye konsa url hai", url);
    try {
      const formData = new FormData();
      formData.append("url", url);

      const response = await axios.post("/api/video-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data);
      setVideoUrlCloudinary(response.data.url);
      setText(response.data.text);
      setVideoDuration(response.data.videoDuration) ;
    } catch (error) {
      console.error("Error uploading file URL:", error);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const callCaption = () => {
    console.log("1", text);
    console.log("1", videoUrlCloudinary);
    const queryParams = new URLSearchParams({
      url: videoUrlCloudinary,
      text: text,
      videoLength: String(videoDuration) 
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
                className="bg-black relative z-10 border border-white rounded-full py-2 px-4 dark:bg-slate-900 text-gray-100 dark:text-white dark:border-slate-800 cursor-pointer"
              >
                submit
              </button>
            </div>
          </form>

          {videoUrlCloudinary && (
            <div className="m-4 flex justify-between">
              <video
                src={videoUrlCloudinary}
                controls
                width="200"
                className="max-w-lg"
              ></video>

              <div className="flex justify-center items-center  relative ">
                <button
                  onClick={() => callCaption()}
                  className="bg-black hover:bg-green-500 transition-all relative z-10 border border-white rounded-full py-2 px-4 dark:bg-slate-900 text-gray-100 dark:text-white dark:border-slate-800 cursor-pointer"
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
