import fs from "fs";

export const createSrtFile = async (content: string, videoLength: number) => {

  console.log(typeof content, content, "lo kar diya")

  const convetToarrayOfPara = content.match(/.{1,30}(?:\s|$)/g);

  const timeGap: number = Math.floor(videoLength / convetToarrayOfPara?.length!);

  // Function to format seconds into SRT timestamp
  function formatTime(seconds: number) {


    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substring(11, 23).replace(".", ",");
  }

  if (convetToarrayOfPara?.length! > 0) {

    let srtContent = "";
    let startTime = 0;
    const contentFile = convetToarrayOfPara?.forEach((para, index) => {
        const endTime = startTime + timeGap; // Arbitrarily assigning 4 seconds per segment
        srtContent += `${index + 1}\n`;
        srtContent += `${formatTime(startTime)} --> ${formatTime(endTime)}\n`;
        srtContent += `${para.trim()}\n\n`;
        startTime = endTime;
      });

    console.log("content file", srtContent)
    fs.writeFile("public/srtfile/output.srt", srtContent, (err) => {
      if (err) throw err;
      console.log("The file has been saved! okk");
      console.log(content);
    });
  }
};
