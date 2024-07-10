import { NextResponse } from "next/server";
import {prisma} from "./../../../../libs/prisma";
import authenticate from "@/middlewares/authenticate";

export async function GET (request: Request) {
    const {error,status,decodedToken, dateToExpiteJWT} = await authenticate(request);
    if (error?.includes('expired')) {
        return NextResponse.json({error:'Token expirado'}, {status})
    }else{
        return NextResponse.json({decodedToken, dateToExpiteJWT}, {status})
    }
}