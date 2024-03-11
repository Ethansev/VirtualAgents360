'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Component() {
    const { data: session, status } = useSession();
    const userEmail = session?.user?.email;

    if (status === 'loading') {
        return <p>Hang on there...</p>;
    }

    if (status === 'authenticated') {
        return (
            <>
                <p>Signed in as {userEmail}</p>
                <div>
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
                <img src='https://cdn.pixabay.com/photo/2017/08/11/19/36/vw-2632486_1280.png' />
            </>
        );
    }

    return (
        <div>
            this is my login
            <button onClick={() => signIn()}>Sign in</button>
        </div>
    );
}
