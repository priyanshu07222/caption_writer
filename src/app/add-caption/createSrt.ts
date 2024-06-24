import axios from "axios";
export async function createSrt(translatedText: string, videoLength: number) {
    const data = {text: translatedText, time: videoLength}
    const response = await axios.post('/api/createSrtFile', data )
    // console.log(response.data)
}