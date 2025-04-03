import AuthForms from '@/components/AuthForms';
import React from 'react'

type Props = {}

const SignInPage = (props: Props) => {
  return (
    <AuthForms type="sign-in" />
  );
}

export default SignInPage;