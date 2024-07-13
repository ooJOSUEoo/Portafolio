import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma'
import { Prisma } from "@prisma/client";
import authenticate from "@/middlewares/authenticate";

interface Params {
    params: {
        id: string
    }
}

export async function GET (request: Request, {params}: Params) {
    // const {error,status} = await authenticate(request);
    // if (error) return NextResponse.json({error}, {status})
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: params.id
            },
            include: {
                skills: {
                    select: {
                        id: true
                    }
                }
            }
        })
        if(!project?.id) return NextResponse.json({message: 'Project not found'}, {status: 404})
        return NextResponse.json({project}, {status: 200})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}

export async function DELETE (request: Request, {params}: Params) {
    const {error,status} = await authenticate(request);
    if (error) return NextResponse.json({error}, {status})
    try {
        const project = await prisma.project.delete({
            where: {
                id: params.id
            }
        })
        if(!project?.id) return NextResponse.json({message: 'Project not found'}, {status: 404})
        return NextResponse.json({project, message: 'Project deleted'}, {status: 200})
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') 
            return NextResponse.json({message: 'Project not found'}, {status: 404})

            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}

export async function PUT (request: Request, {params}: Params) {
    const {error,status,} = await authenticate(request);
    if (error) return NextResponse.json({error}, {status})
    try {
        const data = await request.json()
        const project = await prisma.project.update({
            where: {
                id: params.id
            },
            data: {
                name: data.name,
                description: data.description,
                mainImage: data.mainImage,
                images: data.images,
                url: data.url,
                github: data.github,
                company: data.company,
                initialDate: data.initialDate,
                endDate: data.endDate,
                isFavourite: data.isFavourite,
                
                skills: {
                    connect: data.skills 
                }
            }
        })
        if(!project?.id) return NextResponse.json({message: 'Project not found'}, {status: 404})
        return NextResponse.json({project}, {status: 200})
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') 
            return NextResponse.json({message: 'Project not found'}, {status: 404})

            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}