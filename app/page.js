'use client'

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {

    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if(status === 'authenticated') {
            router.push('/dashboard');
        }
    }, [status, session]);

  return (
      <section className="w-full flex-center mt-6">
        <h1>Welcome to Sandsharks!</h1>
        <p>Here's where a photo of sandsharks will go...</p>
        <p>Here's a description of what sandsharks is all about</p>
        <Link href="/register">
          <button className="btn mt-4">
            Become a member
          </button>      
        </Link>
      </section>
  );
}
