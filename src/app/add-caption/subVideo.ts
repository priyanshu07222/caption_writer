import axios from "axios";

export async function subVideo(videoUrll: string){
    const videoUrl = {videoUrl: videoUrll}
    const response = await axios.post('/api/addSubtitle', videoUrl)
    return response.data
}