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
        const skill = await prisma.skill.findUnique({
            where: {
                id: params.id
            }
        })
        if(!skill?.id) return NextResponse.json({message: 'Skill not found'}, {status: 404})
        return NextResponse.json({skill}, {status: 200})
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
        const skill = await prisma.skill.delete({
            where: {
                id: params.id
            }
        })
        if(!skill?.id) return NextResponse.json({message: 'Skill not found'}, {status: 404})
        return NextResponse.json({skill, message: 'Skill deleted'}, {status: 200})
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') 
            return NextResponse.json({message: 'Skill not found'}, {status: 404})

            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}

export async function PUT (request: Request, {params}: Params) {
    const {error,status,} = await authenticate(request);
    if (error) return NextResponse.json({error}, {status})
    try {
        const {name, image} = await request.json()
        const skill = await prisma.skill.update({
            where: {
                id: params.id
            },
            data: {
                name,
                image
            }
        })
        if(!skill?.id) return NextResponse.json({message: 'Skill not found'}, {status: 404})
        return NextResponse.json({skill}, {status: 200})
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') 
            return NextResponse.json({message: 'Skill not found'}, {status: 404})

            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}