import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDb } from "@/utils/database"
import Member from "@/models/memberModel"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: ""},
                password: { label: "Password", type: "password", placeholder: ""}
            },

            async authorize(credentials) {
                const {email, password} = credentials
                
                try {
                    await connectToDb()

                    const member = await Member.findOne({ email })

                    if(!member) {
                        return new NextResponse(400, { error: 'member not found' })
                    }

                    const passwordsMatch = await bcrypt.compare(password, member.password)
                    if(!passwordsMatch) {
                        return new NextResponse(400, { error: 'Incorrect password' })
                    } 

                    return member
                } catch (error) {
                    console.log(error)
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    strategy: {
       jwt: true
    },
    callbacks: {
        async jwt({ token, member }) {
            if(member) {
                token.id = member._id
                token.email = member.email
                // token.firstName = member.firstName
                // token.lastName = member.lastName
                // token.preferredName = member.preferredName
                // token.memberType = member.memberType
                // token.waiver = member.waiver
            }          
          return token
        },
        async session({ session, token }) {
            const sessionUser = await Member.findOne({ email: token.email })

            if(!sessionUser) {
                return null
            } else {
                session.user = {
                    id: sessionUser._id,
                    email: sessionUser.email,
                    firstName: sessionUser.firstName,
                    lastName: sessionUser.lastName,
                    preferredName: sessionUser.preferredName,
                    memberType: sessionUser.memberType,
                    waiver: sessionUser.waiver,
                    pronouns: sessionUser.pronouns
                }
                return session
            }
      },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
}}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}