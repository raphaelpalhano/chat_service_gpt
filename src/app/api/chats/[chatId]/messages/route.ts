import { prisma } from "@/app/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

//api/chats/{ID}/messages
export async function GET(_request: NextRequest, {params}: {params: {chatId: string}}){
     const messages = await prisma.message.findMany({
        where: {
            chat_id: params.chatId
        },
        orderBy: {created_at: "asc"}
    })

    return NextResponse.json(messages);
}

// api/chats/{ID}/messages
export async function POST(request: NextRequest, {params}: {params: {chatId: string}}){
    const body = await request.json();

    const chat = await prisma.chat.findUniqueOrThrow({
        where: {
            id: params.chatId
        }
    })

    const messageCreated = await prisma.message.create({
        data: {
            content: body.message,
            chat_id: chat.id
        }
    })

    return NextResponse.json(messageCreated);
}

