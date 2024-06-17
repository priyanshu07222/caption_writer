import axios from "axios"
async function translateText(text: string, target_lang: string): Promise<string>{
    // console.log(text)
    // console.log(target_lang)
    const data = {text, target_lang}
    const response = await axios.post('/api/translate', data)
    const translatedTextg = response.data.translatedText
    return translatedTextg
}

export default translateText;