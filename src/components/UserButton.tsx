"use client";

import React from 'react'
import { Button } from './ui/button';
import { signOut } from '@/lib/actions/auth.action';

type Props = {
  user: User | null;
}

const UserButton = ({ user }: Props) => {
  if (!user) return null;

  return (
    <div className='flex gap-2 items-center'>
      <p>Hi, <span className='underline'>{user?.name}</span>!</p>
      <Button variant='destructive' onClick={signOut} className="cursor-pointer">
        Logout
      </Button>
    </div>
  );
}

export default UserButton;