import { NextResponse} from 'next/server';
import { connectToDb } from '@/utils/database';
import Member from '@/models/memberModel';

export const PUT = async (request) => {
    try {
        await connectToDb()

        const { pathname } = request.nextUrl
        const id = pathname.split('/').pop()

        const body = await request.json()

        const updatedMember = await Member.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        })


       
        return new Response(JSON.stringify(updatedMember), {
            status: 200
        })
    } catch (error) {
        return new Response('failed to fetch prompts', {
            status: 500
        })
    }
}

export const GET = async (request) => {
    try {
        await connectToDb()

        const { pathname } = request.nextUrl
        const id = pathname.split('/').pop()

        const member = await Member.findById(id).select('-password');
        
        return new Response(JSON.stringify(member), {
            status: 200
        })
    } catch (error) {
        return new Response('failed to fetch prompts', {
            status: 500
        })
    }
}