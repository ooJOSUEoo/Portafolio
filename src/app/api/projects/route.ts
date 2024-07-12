import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma'
import authenticate from '@/middlewares/authenticate';

export async function GET (request: Request) {
    const {error,status} = await authenticate(request);
    if (error) return NextResponse.json({error}, {status})

    try {
        const projects = await prisma.project.findMany()
        return NextResponse.json({projects}, {status: 200})
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
        const project = await prisma.project.create({
            data: {
                id: data.id,
                name: data.name,
                description: data.description,
                mainImage: data.mainImage,
                images: data.images, //'{"id":"a","num":5,"types":["png","jpg","png","png","jpg"]}',
                url: data.url,
                github: data.github,
                company: data.company,
                initialDate: data.initialDate,
                endDate: data.endDate,
                isFavourite: data.isFavourite,

                skills: {

                    connect: data.skills //[{id:"a"},{id:"b"}]
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