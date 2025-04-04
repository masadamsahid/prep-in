import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: Props) => {
  if (await isAuthenticated()) return redirect("/");

  return (
    <div className='auth-layout'>
      {children}
    </div>
  );
}

export default AuthLayout;