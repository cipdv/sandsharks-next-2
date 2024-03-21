'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import RegistrationForm from '@/components/RegistrationForm';

function RegistrationPage() {

    const router = useRouter()
    const { data: session, status } = useSession();
    
    useEffect(() => {
        if (session?.user) {
            router.push('/dashboard');
        }
    }, [session]);

    return (
        <RegistrationForm />
    )
}

export default RegistrationPage;