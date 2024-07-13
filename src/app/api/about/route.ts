import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma'
import authenticate from '@/middlewares/authenticate';

export async function GET (request: Request) {
    // const {error,status} = await authenticate(request);
    // if (error) return NextResponse.json({error}, {status})

    try {
        const about = await prisma.about.findFirst()
        return NextResponse.json({about}, {status: 200})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}

export async function POST (request: Request) {
    const {error,status,userId} = await authenticate(request);
    if (error) return NextResponse.json({error}, {status})

    try {
        const data = await request.json()
        const about = await prisma.about.upsert({
            where: {
                id: data.id
            },
            update: {
                name: data.name,
                description: data.description,
                cv: data.cv,
                image: data.image
            },
            create: {
                id: data.id,
                name: data.name,
                description: data.description,
                cv: data.cv,
                image: data.image
            }
        })
        return NextResponse.json({about}, {status: 200})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}