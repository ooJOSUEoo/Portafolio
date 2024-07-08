import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma'
import authenticate from '@/middlewares/authenticate';

export async function GET (request: Request) {
    const {error,status} = await authenticate(request);
    if (error) return NextResponse.json({error}, {status})

    try {
        const project = await prisma.project.findMany()
        return NextResponse.json({project}, {status: 200})
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
        const {name, description, mainImage, images, url, github, company, initialDate, endDate, isFavourite, skills} = await request.json()
        const project = await prisma.project.create({
            data: {
                name,
                description,
                mainImage,
                images,
                url,
                github,
                company,
                initialDate,
                endDate,
                isFavourite,

                skills: {
                    create: skills
                }
            }
        })
        return NextResponse.json({project}, {status: 200})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}