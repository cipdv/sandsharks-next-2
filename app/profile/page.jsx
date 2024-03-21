'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from 'axios'; // if you're using axios for HTTP requests
import MemberProfileForm from "@/components/MemberProfileForm";

const Profile = () => {
    const { data: session, status } = useSession();
    const [profileData, setProfileData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            // Replace '/api/profile' with your actual API endpoint
            axios.get(`/api/profile/${session?.user?.id}`, { params: { userId: session.user.id } })
                .then(response => {
                    setProfileData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching profile data:', error);
                });
        } else {
            router.push('/login');
        }
    }, [status, session, router]);

    return profileData ? <MemberProfileForm profileData={profileData} /> : <div>Loading...</div>;
};

export default Profile;