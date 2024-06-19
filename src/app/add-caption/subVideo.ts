import axios from "axios";

export async function subVideo(videoUrll: string){
    console.log("yaha 6", videoUrll)
    const videoUrl = {videoUrl: videoUrll}
    console.log(videoUrl, "laiala")
    const response = await axios.post('/api/addSubtitle', videoUrl)
    console.log("Response form subVideo", response.data)
}