'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import MemberDashboard from "@/components/MemberDashboard"
import SuperSharkDashboard from "@/components/SuperSharkDashboard"
import UltraSharkDashboard from "@/components/UltraSharkDashboard"
import Waiver from "@/components/Waiver"
import Fakeboard from "@/components/Fakeboard"

const dashboard = () => {

  const router = useRouter();
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      if (status === 'authenticated') {
          fetch('/api/posts')
              .then(response => response.json())
              .then(data => setPosts(data));
      } else {
          router.push('/login');
      }
  }, [status, session]);

    return (
        <div>
          {session?.user?.waiver === false && <Waiver member={session?.user} />}
    
          {session?.user?.waiver === true && (
            <>
              {session?.user?.memberType === 'member' && <MemberDashboard member={session?.user} posts={posts} />}
              {session?.user?.memberType === 'supershark' && <SuperSharkDashboard member={session?.user} posts={posts}/>}
              {session?.user?.memberType === 'ultrashark' && <Fakeboard member={session?.user} posts={posts}/>}
            </>
          )}
        </div>
      )
}

export default dashboard