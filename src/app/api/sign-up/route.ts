import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user.model";
import { NextRequest } from "next/server";

export async function POST(request:NextRequest){
    await dbConnect();
    try {
        const req = await request.json()
        console.log(req)

        return Response.json({
            message: "done",
        })
    } catch (error) {
        console.log("Error 5--", error)
    }
}