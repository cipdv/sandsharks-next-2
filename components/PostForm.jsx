'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createNewPost, createTodo } from '@/app/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostFormSchema } from '@/app/lib/postFormSchema';
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
    message: '',
    title: ''
}


function SubmitButton() {
    const { pending } = useFormStatus();
  
    return (
      <button type="submit" aria-disabled={pending}>
        Add
      </button>
    );
  }

const PostForm = () => {

//   const [beginnerClinicOffered, setBeginnerClinicOffered] = useState(false);
//   const { register, handleSubmit, formState: { errors }, reset } = useForm({
//     resolver: zodResolver(PostFormSchema)  // use Zod for validation
//   });

//   const submitPostForm = async (formData) => {
//     try {
//       console.log('form file', formData);
//       await createNewPost(formData);
//       reset();
//     } catch (error) {
//       console.error(error);
//     }
//   };

    const [state, formAction] = useFormState(createNewPost, initialState);

  return (
      <form action={formAction} className="bg-blue-100 p-4 rounded-md">  
        <div className="flex flex-col gap-3 glassmorphism">
            <h1 className="text-2xl font-bold">Create a new post</h1>
                <label>Title</label>
                <input type="text" name='title' />
                <h1>{state?.title}</h1>
                <label>Message</label>
                <textarea className="min-h-[200px] w-full" name='message'/>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 w-full">
                    <div className="sm:w-4/12">
                        <label>Date</label>
                        <input type="date" name="date"  className="w-full" />
                        
                    </div>
                    <div className="sm:w-4/12">
                        <label>Start Time</label>
                        <input type="time" name="startTime" className="w-full" />
                        
                    </div>
                    <div className="sm:w-4/12">
                        <label>End Time</label>
                        <input type="time" name="endTime" className="w-full" />
                        
                    </div>
                </div>
                <div>
                    <input type="checkbox" name="beginnerClinicOffered" />
                    <label className='ml-2'>Beginner Clinic Offered</label>
                </div>
                {/* {beginnerClinicOffered && ( */}
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 w-full">
                        <div className="sm:w-1/2">
                            <label>Beginner Clinic Start Time</label>
                            <input type="time" name="beginnerClinicStartTime" className="w-full" />
                        </div>
                        <div className="sm:w-1/2">
                            <label>Beginner Clinic End Time</label>
                            <input type="time" name="beginnerClinicEndTime" className="w-full" />
                        </div>
                    </div>
                {/* )} */}
                {/* <p aria-live="polite" className="sr-only" role="status">
                    {state?.message}
                </p> */}
                <h1>{state?.message}</h1>
                <SubmitButton />
            </div>
        </form>
    )
}


export default PostForm