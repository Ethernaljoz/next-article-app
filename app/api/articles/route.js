import prisma from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/lib/session";
import { NextResponse } from "next/server";

export async function POST(request){

    const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({message:'user not authenticated!'},{status:400})
    }
    
    try{        
        const body = await request.json()

        const{title, content } = body

        if(!title || !content){
            return NextResponse.json({message:'please add all the fields'},{status:400})
        }

        const articleCreated = await prisma.post.create({
            data:{
                title,
                content,
                authorEmail:user.email
            }
        })

        return NextResponse.json({articleCreated},{status:201})

    }catch(err){
        console.log(err)
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }





}










































