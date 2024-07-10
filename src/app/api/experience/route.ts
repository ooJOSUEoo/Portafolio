import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma'
import authenticate from '@/middlewares/authenticate';

export async function GET (request: Request) {
    const {error,status} = await authenticate(request);
    if (error) return NextResponse.json({error}, {status})

    try {
        const experience = await prisma.experience.findMany()
        return NextResponse.json({experience}, {status: 200})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}

export async function POST (request: Request) {
    const {error,status} = await authenticate(request);
    if (error) return NextResponse.json({error}, {status})

    try {
        const data = await request.json()
        const experience = await prisma.experience.create({
            data: data
        })
        return NextResponse.json({experience}, {status: 200})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}