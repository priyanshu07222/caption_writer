import axios from "axios";
export async function createSrt(translatedText: string, videoLength: number) {
    console.log("checking")
    console.log("my translated textss", translatedText)
    const data = {text: translatedText, time: videoLength}
    const response = await axios.post('/api/createSrtFile', data )
    console.log(response.data)
}