// import { z } from 'zod'

// const postRepliesSchema = z.object({
//     name: z.string().min(1, 'Name is required'),
//     email: z.string().email().min(1, 'Email is required'),
//     userId: z.string().min(1, 'User ID is required'),
//     reply: z.string().min(1, 'Reply is required'),
//     image: z.string(),
// });

// const begClinicRepliesSchema = z.object({
//     name: z.string().min(1, 'Name is required'),
//     email: z.string().email().min(1, 'Email is required'),
//     userId: z.string().min(1, 'User ID is required'),
//     reply: z.string().min(1, 'Reply is required'),
//     image: z.string(),
// });

// const beginnerClinicSchema = z.object({
//     beginnerClinicOffered: z.boolean().default(false),
//     beginnerClinicStartTime: z.string(),
//     beginnerClinicEndTime: z.string(),
//     replies: z.array(begClinicRepliesSchema),
// });

// export const PostSchema = z.object({
//     title: z.string().min(1, 'Title is required'),
//     message: z.string().min(1, 'Message is required'),
//     createdAt: z.date(),
//     date: z.string(),
//     startTime: z.string(),
//     endTime: z.string(),
//     beginnerClinic: beginnerClinicSchema,
//     seekingReplies: z.boolean().default(true),
//     replies: z.array(postRepliesSchema),
// });

import { z } from 'zod';

export const PostFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  beginnerClinic: z.object({
    beginnerClinicOffered: z.boolean().default(false),
    beginnerClinicStartTime: z.string(),
    beginnerClinicEndTime: z.string(),
  }).optional(),
  
});