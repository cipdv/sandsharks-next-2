'use client'

import { RegistrationFormSchema } from '@/app/lib/registrationFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { registerNewMember } from '@/app/actions';

const RegistrationForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(RegistrationFormSchema),
    });
    
    const processRegistrationForm = async (formData) => {
        try {
            console.log('reg form', formData);
            await registerNewMember(formData);
        } catch (error) {
            if (error instanceof z.ZodError) {
                error.errors.forEach(err => console.log(err.message));
            } else {
                console.error(error);
            }
        }
    }

    return (
        <form className="w-full mx-auto mt-6" onSubmit={handleSubmit(processRegistrationForm)}>
            <div className="flex flex-col gap-3 glassmorphism">
                <label htmlFor="firstName">First Name</label>
                <input
                type="text" 
                id="firstName"
                name="firstName"
                placeholder='Your legal first name'
                {...register("firstName", { required: true })}
                />
                <label htmlFor="preferredName">Preferred Name</label>
                <input
                type="text"
                id="preferredName"
                name="preferredName"
                placeholder='This is the name other members will see on the website'
                {...register("preferredName")}
                />
                {errors.firstName && <p className="text-red-500">{errors?.firstName?.message}</p>}
                <label htmlFor="lastName">Last Name</label>
                <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder='Your legal last name'
                {...register("lastName", { required: true })}
                />
                {errors.lastName && <p className="text-red-500">{errors?.lastName?.message}</p>}
                
                <label htmlFor="pronouns">Pronouns</label>
                <select
                id="pronouns"
                name="pronouns"
                defaultValue={""}
                {...register("pronouns")}
                >
                    <option value="" disabled="disabled">Select</option>
                    <option value="they/them">They/them</option>
                    <option value="she/her">She/her</option>
                    <option value="he/him">He/him</option>
                    <option value="other">Other</option>
                </select>
                {errors.pronouns && <p className="text-red-500">{errors?.pronouns?.message}</p>}
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder='This email will be your login as well as for email updates if you opt in'
                {...register("email", { required: true })}
                />
                {errors.email && <p className="text-red-500">{errors?.email?.message}</p>}
                <div className="flex items-center">
                    <input type="checkbox" name="emailNotifications" {...register("emailNotifications")} />
                    <label className="ml-2">Check here if you want to receive email notifications when updates are posted</label>
                </div>
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                name="password"
                placeholder='Must be at least 6 characters long'
                {...register("password", { required: true })}
                />
                {errors.password && <p className="text-red-500">{errors?.password?.message}</p>}
                <label htmlFor="password">Confirm Password</label>
                <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder='Must match the password above'
                {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword && <p className="text-red-500">{errors?.confirmPassword?.message}</p>}
                <button type="submit" className="btn">
                    Register
                </button>
            </div>
        </form>
    )
}

export default RegistrationForm