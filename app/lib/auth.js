import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma"
import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials"



export const authOptions ={

    adapter: PrismaAdapter(prisma),

    providers: [
        CredentialsProvider({
          
          name: "credentials",
          
          credentials: {
            email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {

            if(!credentials.email || !credentials.password){
                throw new Error('please add all the fields')
            }

            const existUser= await prisma.user.findUnique({
                where:{
                    email:credentials.email
                }
            })

            if(!existUser){
                throw new Error('user not found')
            }

            const verifyPassword = await bcrypt.compare(credentials.password, existUser.password)

            if(!verifyPassword){
                throw new Error('password incorrect')
            }

            return existUser          
            
          }
        })
      ],
      secret:process.env.SECRET_KEY,
      session:{
        strategy:"jwt"
      },
      debug: process.env.NODE_ENV === "development",


}