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
        const contact = await prisma.contact.findUnique({
            where: {
                id: params.id
            }
        })
        if(!contact?.id) return NextResponse.json({message: 'Contact not found'}, {status: 404})
        return NextResponse.json({contact}, {status: 200})
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
        const contact = await prisma.contact.delete({
            where: {
                id: params.id
            }
        })
        if(!contact?.id) return NextResponse.json({message: 'Contact not found'}, {status: 404})
        return NextResponse.json({contact, message: 'Contact deleted'}, {status: 200})
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') 
            return NextResponse.json({message: 'Contact not found'}, {status: 404})

            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}

export async function PUT (request: Request, {params}: Params) {
    const {error,status,} = await authenticate(request);
    if (error) return NextResponse.json({error}, {status})
    try {
        const {name, icon, url} = await request.json()
        const contact = await prisma.contact.update({
            where: {
                id: params.id
            },
            data: {
                name,
                icon,
                url,
            }
        })
        if(!contact?.id) return NextResponse.json({message: 'Contact not found'}, {status: 404})
        return NextResponse.json({contact}, {status: 200})
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') 
            return NextResponse.json({message: 'Contact not found'}, {status: 404})

            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}