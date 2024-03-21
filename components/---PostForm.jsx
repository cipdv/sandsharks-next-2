'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createNewPost } from '@/app/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostFormSchema } from '@/app/lib/postFormSchema';

const PostForm = () => {

//   const [beginnerClinicOffered, setBeginnerClinicOffered] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(PostFormSchema)  // use Zod for validation
  });

  const submitPostForm = async (formData) => {
    try {
      console.log('form file', formData);
      await createNewPost(formData);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const [ state, formActions ] = useFormState(createNewPost, initialState)

  return (
      <form onSubmit={handleSubmit(submitPostForm)} className="bg-blue-100 p-4 rounded-md">  
        <div className="flex flex-col gap-3 glassmorphism">
            <h1 className="text-2xl font-bold">Create a new post</h1>
                <label>Title</label>
                <input type="text" name='title' {...register('title')} />
                {errors.title && <h1>{errors?.title?.message}</h1>}
                <label>Message</label>
                <textarea className="min-h-[200px] w-full" name='message' {...register('message')} />
                {errors.message && <h1>{errors?.message?.message}</h1>}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 w-full">
                    <div className="sm:w-4/12">
                        <label>Date</label>
                        <input type="date" name="date" {...register('date')} className="w-full" />
                        {errors.date && <h1>{errors.date.message}</h1>}
                    </div>
                    <div className="sm:w-4/12">
                        <label>Start Time</label>
                        <input type="time" {...register('startTime')} className="w-full" />
                        {errors.startTime && <h1>{errors.startTime.message}</h1>}
                    </div>
                    <div className="sm:w-4/12">
                        <label>End Time</label>
                        <input type="time" {...register('endTime')} className="w-full" />
                        {errors.endTime && <h1>{errors.endTime.message}</h1>}
                    </div>
                </div>
                <div>
                    <input type="checkbox" {...register('beginnerClinic.beginnerClinicOffered')} />
                    <label className='ml-2'>Beginner Clinic Offered</label>
                </div>
                {/* {beginnerClinicOffered && ( */}
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 w-full">
                        <div className="sm:w-1/2">
                            <label>Beginner Clinic Start Time</label>
                            <input type="time" {...register('beginnerClinic.beginnerClinicStartTime')} className="w-full" />
                        </div>
                        <div className="sm:w-1/2">
                            <label>Beginner Clinic End Time</label>
                            <input type="time" {...register('beginnerClinic.beginnerClinicEndTime')} className="w-full" />
                        </div>
                    </div>
                {/* )} */}
                <button type="submit" className='btn mt-4'>Submit</button>
            </div>
        </form>
    )
}


export default PostForm