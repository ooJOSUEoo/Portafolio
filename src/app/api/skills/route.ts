import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma'
import authenticate from '@/middlewares/authenticate';

export async function GET (request: Request) {
    const {error,status} = await authenticate(request);
    if (error) return NextResponse.json({error}, {status})

    try {
        const skills = await prisma.skill.findMany()
        return NextResponse.json({skills}, {status: 200})
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
        const skill = await prisma.skill.create({
            data: data
        })
        return NextResponse.json({skill}, {status: 200})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}