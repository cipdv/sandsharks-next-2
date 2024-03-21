'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { signIn, signOut, useSession } from 'next-auth/react'

const Navbar = () => {

    const { data: session } = useSession();
    const [toggleDropdown, settoggleDropdown] = useState(false)
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                settoggleDropdown(false);
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className='sm:flex hidden items-center justify-between bg-blue-100'>
            <div className='flex items-center'>
                <Link href="/">
                    <Image 
                        src='/images/logo.jpg'
                        width={100}
                        height={100}
                        className="object-contain"
                        alt='Sandsharks logo'
                    />
                    <p className="logo_text">
                        Sandsharks.org
                    </p>
                </Link>    
            </div>
            <div className='sm:flex hidden items-center'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5 items-center'>
                        <Link href="/profile" className="mr-4">
                            Update profile
                            {/* icon of user's profile photo with dropdown to update profile, signout, delete account */}
                        </Link>
                        <Link href="/about" className="mr-4">
                            About the League
                            {/* dropdown for league information, league history, members, how to volunteer */}
                        </Link>
                        <Link href="/volunteer" className="mr-4">
                                Volunteer
                        </Link>
                        <button className="black_btn" onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
                    </div>
                    ) : (
                        <div className='flex gap-3 md:gap-5 ml-auto items-center'>
                            <Link href="/about" className="mr-4">
                                About the League
                            </Link>
                            <button className="black_btn" onClick={() => signIn()}>Sign In</button>
                        </div>
                    
                )}
            </div>
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                <div className='flex'>
                    <i className="fas fa-bars" onClick={()=> {settoggleDropdown((prev) => !prev)}}></i>
                    {toggleDropdown && (
                        <div className='dropdown' ref={dropdownRef}>
                            <Link href="/dashboard" className="dropdown_link" onClick={() => settoggleDropdown(false)}>
                                Dashboard
                            </Link>
                            <Link href="/receipts" className="dropdown_link" onClick={() => settoggleDropdown(false)}>
                                Receipts
                            </Link>
                            <Link href="/health-history" className="dropdown_link" onClick={() => settoggleDropdown(false)}>
                                Health History
                            </Link>
                            <button className='mt-5 w-full black_btn' type='button' onClick={() => {
                                settoggleDropdown(false) 
                                signOut()} 
                            }
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <button className="black_btn" onClick={() => signIn()}>Sign In</button>
                </>
            )}
            </div>
        </nav>
    )
}

export default Navbar