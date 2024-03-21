
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MemberProfileSchema } from '@/app/lib/memberProfileSchema';
import { useSession } from 'next-auth/react';


const MemberProfileForm = ({profileData}) => {
    
    const { data: session, status } = useSession();
    const router = useRouter();
  
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
      resolver: zodResolver(MemberProfileSchema),
    });
  
    useEffect(() => {
      if (status === 'authenticated' && session) {
        const { firstName, lastName, preferredName, pronouns, email, about, profilePic, emailNotifications } = profileData;
        console.log('profile data', profileData)
        setValue('firstName', firstName);
        setValue('lastName', lastName);
        setValue('preferredName', preferredName);
        setValue('pronouns', pronouns);
        setValue('email', email);
        setValue('about', about);
        setValue('profilePic', profilePic);
        setValue('emailNotifications', emailNotifications);
      }
    }, [status, session, setValue]);
    


  return (
    <div>
        <h1>{profileData?.preferredName}'s profile</h1>
        <form className="w-full mx-auto mt-6">
            <div className="flex flex-col gap-3 glassmorphism">
                <label>First name:</label>
                <input type="text" name="firstName" {...register("firstName")} />
                <label>Name you go by:</label>
                <input type="text" name="preferredName" {...register("preferredName")} />
                <label>Last name:</label>
                <input type="text" name="lastName" {...register("lastName")} />
                <label>Email:</label>
                <input type="text" name="email" {...register("email")} />
                <label>Pronouns:</label>
                <select
  id="pronouns"
  name="pronouns"
  {...register("pronouns")}
>
  <option value="" disabled="disabled">Select</option>
  <option value="they/them">They/them</option>
  <option value="she/her">She/her</option>
  <option value="he/him">He/him</option>
  <option value="other">Other</option>
</select>
                {errors.pronouns && <p className="text-red-500">{errors?.pronouns?.message}</p>}
                <label>About me:</label>
                <textarea name="about" />
                <label>Profile picture:</label>
                <input type="file" name="profilePic" />
                <div className="flex items-center">
                    <input type="checkbox" name="emailNotifications" {...register('emailNotifications')} />
                    <label className="ml-2">Check here if you want to receive email notifications when an update is posted</label>
                </div>

                <button className="btn">Update</button>
            </div>
        </form>
        <p>
            Delete profile
        </p>
    </div>
  )
}

export default MemberProfileForm