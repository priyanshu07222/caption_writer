import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";
import * as deepl from "deepl-node";
import { TargetLanguageCode } from "deepl-node";

const authKey = process.env.DEEPL_API_KEY || "";
const translator = new deepl.Translator(authKey);

export async function POST(req: NextRequest) {
  const response = await req.formData();
  const textToBeTranslated = response.get("text") as string;
  const translatedIn = response.get("target_lang");

  function isValidLanguageCode(
    code: any
  ): code is TargetLanguageCode {
    return ["fr", "de"].includes(code);
  };

  try {
    if(!textToBeTranslated || !translatedIn) {
      return Response.json({
        message: "Please provide text and target language",
      });
    }
    
    if (isValidLanguageCode(translatedIn)) {
      const result = await translator.translateText(
        textToBeTranslated,
        null,
        translatedIn
      );

      const translatedText = result.text;
      return Response.json({
        message: "translated successfully",
        translatedText,
      });
    }
  } catch (error: any) {
    Response.json({
      message: "Error while translating failed",
      error,
    });
  }
}
