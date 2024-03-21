import { NextResponse} from 'next/server';
import { connectToDb } from '@/utils/database';
import Post from '@/models/postModel';

// export const PUT = async (request) => {
//     try {
//         await connectToDb()

//         const { pathname } = request.nextUrl
//         const id = pathname.split('/').pop()

//         const body = await request.json()

//         const updatedMember = await Member.findByIdAndUpdate(id, body, {
//             new: true,
//             runValidators: true
//         })


       
//         return new Response(JSON.stringify(updatedMember), {
//             status: 200
//         })
//     } catch (error) {
//         return new Response('failed to fetch prompts', {
//             status: 500
//         })
//     }
// }

export const GET = async () => {
    try {
        await connectToDb()

        const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
        
        return new Response(JSON.stringify(posts), {
            status: 200
        })
    } catch (error) {
        return new Response('failed to fetch prompts', {
            status: 500
        })
    }
}