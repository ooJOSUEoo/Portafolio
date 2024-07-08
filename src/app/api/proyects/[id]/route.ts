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
    const {error,status} = await authenticate(request);
    if (error) return NextResponse.json({error}, {status})
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: params.id
            }
        })
        if(!project?.id) return NextResponse.json({message: 'Proyecto no encontrado'}, {status: 404})
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
        if(!project?.id) return NextResponse.json({message: 'Proyecto no encontrado'}, {status: 404})
        return NextResponse.json({project, message: 'Proyecto eliminado'}, {status: 200})
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') 
            return NextResponse.json({message: 'Proyecto no encontrado'}, {status: 404})

            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}

export async function PUT (request: Request, {params}: Params) {
    const {error,status,} = await authenticate(request);
    if (error) return NextResponse.json({error}, {status})
    try {
        const {name, description, mainImage, images, url, github, company, initialDate, endDate, isFavourite, skills} = await request.json()
        const project = await prisma.project.update({
            where: {
                id: params.id
            },
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
        if(!project?.id) return NextResponse.json({message: 'Habilidad no encontrada'}, {status: 404})
        return NextResponse.json({project}, {status: 200})
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') 
            return NextResponse.json({message: 'Habilidad no encontrada'}, {status: 404})

            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}