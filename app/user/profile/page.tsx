'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <Image className='h-24 w-auto' src={user.picture!} alt={user.name!} width={6} height={6} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
