'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

const LoginPage = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    
    useEffect(() => {
        if (session) {
            router.push('/dashboard');
        }
    }, [session]);
    
    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const loginUser = (e) => {
        e.preventDefault();
        setSubmitting(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((res) => {
                setSubmitting(false);
                if (res.error) {
                    console.log(res.error);
                } else {
                    router.push('/dashboard');
                }
            })
            .catch((error) => {
                setSubmitting(false);
                console.error('Error:', error);
            });
    };

    return (
        <section className='w-full max-w-full flex-center flex-col'>
            <form onSubmit={loginUser} className='mt-10 w-full max-w-2xl flex flex-col gap-3 glassmorphism'>            
                <label>Email</label>
                <input type='email' value={data.email} onChange={(e)=>{setData({...data, email: e.target.value})}} required id='email' name='email'/>           
                <label>Password</label>
                <input type='password' value={data.password} onChange={(e)=>{setData({...data, password: e.target.value})}} required id='password' name='password'/>
                <button type='submit' className='btn'>Login</button>
            </form>
        </section>
    );
};

export default LoginPage;