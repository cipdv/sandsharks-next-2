import { z } from 'zod'

export const MemberProfileSchema = z.object({
    email: z.string().email().min(1, 'Email is required'),
    firstName: z.string().min(1, 'First name is required'),
    preferredName: z.string(),
    lastName: z.string().min(1, 'Last name is required'),
    pronouns: z.string().min(1, 'Pronouns are required'),
    preferredName: z.string(),
    about: z.string(),
    profilePic: {
        image: z.string(),
        approved: z.boolean()
    },
    emailNotifications: z.boolean()
})