import prisma from "@/app/lib/prisma"
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server"


export async function POST(request){
    const body = await request.json()

    const {username, email, password} = body

    if(!username || !email ||!password){
        throw new Error('please add all the fields')
    }

    const existUser= await prisma.user.findUnique({
        where:{
            email,
        }
    })
    if(existUser){
        throw new Error('email already exist')
    }

    const salt = await bcrypt.genSalt(12)

    const hashPassword = await bcrypt.hash(password,salt)

    const user = await prisma.user.create({
        data:{
            username,
            email,
            password:hashPassword,
        }
    })

    return NextResponse.json(user)

}