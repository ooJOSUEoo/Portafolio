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
        const experience = await prisma.experience.findUnique({
            where: {
                id: params.id
            }
        })
        if(!experience?.id) return NextResponse.json({message: 'Experiencia no encontrada'}, {status: 404})
        return NextResponse.json({experience}, {status: 200})
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
        const experience = await prisma.experience.delete({
            where: {
                id: params.id
            }
        })
        if(!experience?.id) return NextResponse.json({message: 'Experiencia no encontrada'}, {status: 404})
        return NextResponse.json({experience, message: 'Experiencia eliminada'}, {status: 200})
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') 
            return NextResponse.json({message: 'Experiencia no encontrada'}, {status: 404})

            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}

export async function PUT (request: Request, {params}: Params) {
    const {error,status,} = await authenticate(request);
    if (error) return NextResponse.json({error}, {status})
    try {
        const {name, description, url, image} = await request.json()
        const experience = await prisma.experience.update({
            where: {
                id: params.id
            },
            data: {
                name,
                description,
                url,
                image,
            }
        })
        if(!experience?.id) return NextResponse.json({message: 'Habilidad no encontrada'}, {status: 404})
        return NextResponse.json({experience}, {status: 200})
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') 
            return NextResponse.json({message: 'Habilidad no encontrada'}, {status: 404})

            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}