'use server'

import { connectToDb } from '@/utils/database';
import { redirect } from 'next/navigation'
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';

//models
import Member from '@/models/memberModel';
import Post from '@/models/postModel';

//schemas
import {RegistrationFormSchema} from '@/app/lib/registrationFormSchema'
import {PostFormSchema} from '@/app/lib/postFormSchema'

export const registerNewMember = async (formData) => {
    const result = RegistrationFormSchema.safeParse(formData)

    if (!result.success) {
        return { message: "Failed to register new member" };
      }
    //validate the userId and handle errors and empty fields
    if(result.success) {
        try {
            const { firstName, lastName, email, password, confirmPassword, preferredName, pronouns, emailNotifications } = result.data

            await connectToDb();

            if(!firstName || !lastName || !email || !password || !confirmPassword ) {
                return  { message: "All fields are required" }
            }
    
            if(password !== confirmPassword) {
                return  { message: "Passwords do not match" }
            }
    
            const memberExists = await Member.findOne({ email })
    
            if (memberExists) {
                return  { message: "Member already exists" }
            }
    
            const hashedPassword = await bcrypt.hash(password, 10)

            await Member.create({
                firstName,
                lastName,
                preferredName,
                pronouns,
                email: email.toLowerCase(),
                password: hashedPassword,    
                memberType: 'member',
                waiver: false,
                emailNotifications,
            })
            
        } catch (error) {
            console.log(error)
        }
        revalidatePath('/')
        redirect('/login')
    }
}

export const confirmWaiver = async (id) => {
    try {
      const member = await Member.findById(id);
      if (!member) {
        throw new Error('Member not found');
      }
  
      member.waiver = true;
      await member.save();
  
      // Convert the Mongoose document to a plain JavaScript object
      let memberObject = member.toObject();
  
      // Delete any properties that you don't want to pass to the client-side component
      delete memberObject.__v;
      delete memberObject.password;
  
      return memberObject;
    } catch (error) {
      console.log(error);
    }
  };

  export const getMemberProfile = async (id) => {
    try {
      await connectToDb();
      const member = await Member.findById(id);
      if (!member) {
        throw new Error('Member not found');
      }
  
      // Convert the Mongoose document to a plain JavaScript object
      let memberObject = member.toObject();
  
      // Delete any properties that you don't want to pass to the client-side component
      delete memberObject.__v;
      delete memberObject.password;
  
      console.log('action', memberObject)
      return memberObject;
    } catch (error) {
      console.log(error);
    }
  }


  export async function createTodo(prevState, formData) {
    const schema = z.object({
      todo: z.string().min(1),
    });
    const parse = schema.safeParse({
      todo: formData.get("todo"),
    });

    if (!parse.success) {
      return { message: "Failed to create todo" };
    }

    const data = parse.data;

    try {
      await sql`
        INSERT INTO todos (text)
        VALUES (${data.todo})
      `;

      revalidatePath("/");
      return { message: `Added todo ${data.todo}` };
    } catch (e) {
      return { message: "Failed to create todo" };
    }
  }
  

  export const createNewPost = async (prevState, formData) => {

    console.log(formData.get('title'))

    console.log('form data', formData)
    const result = PostFormSchema.safeParse({
      title: formData.get('title'),
      message: formData.get('message'),
      date: formData.get('date'),
      startTime: formData.get('startTime'),
      endTime: formData.get('endTime'),
      beginnerClinic: {
        beginnerClinicOffered: formData.get('beginnerClinicOffered') ? true : false,
        beginnerClinicStartTime: formData.get('beginnerClinicStartTime'),
        beginnerClinicEndTime: formData.get('beginnerClinicEndTime'),
      },
  })
    console.log('result', result)

    if(!result?.data?.title) {
      return { title: 'title is required' }
    }

    // if (!result.success) {
    //     return { message: "Failed to create new post" };
    // }

    const data = result.data;
    
        try {
            const { title, message, date, startTime, endTime, beginnerClinicOffered, beginnerClinicStartTime, beginnerClinicEndTime, seekingReplies } = data

            await connectToDb();
    
            await Post.create({
                title,
                message,
                date,
                startTime,
                endTime,
                beginnerClinic: {
                    beginnerClinicOffered,
                    beginnerClinicStartTime,
                    beginnerClinicEndTime
                },
                seekingReplies,
                createdAt: new Date()            
              })

              revalidatePath('/dashboard')
              return { message: `Added todo ${data.title}` };
    } catch (e) {
      return { message: "Failed to create todo" };
    }

        
}

  
export const getAllPosts = async () => {
    try {
        await connectToDb();
        const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
        return posts;
    } catch (error) {
        console.error(error);
    }
}
