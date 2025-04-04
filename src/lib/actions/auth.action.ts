"use server";

import { auth, db } from "@/lib/firebase/admin";
import { cookies } from "next/headers";

const SESSION_DURATION = 60 * 60 * 24 * 7; // a week

export async function signUp(params: SignUpParams) {
  const { uid, name, email, password } = params;

  try {
    const userRecord = await db.collection('users').doc(uid).get();

    if(userRecord.exists) {
      return {
        success: false,
        message: 'User already exists. Please sign-in instead.',
      }
    }

    // Store user data in firestore
    await db.collection('users').doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error('Error creating a user', error);

    if(error.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: 'Email already in use',
      }
    }

    return {
      success: false,
      message: 'Failed to create an account',
    }
    
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if(!userRecord) {
      return {
        success: false,
        message: 'User does not exist. Please sign up instead.',
      }
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: 'Signed in successfully.',
    }
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'Failed to sign in to an account.',
    }
    
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000,
  });

  cookieStore.set('session', sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: "/",
    sameSite: "lax",
  });
}


export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if(!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie);
    const uid = decodedClaims.uid;

    const userRecord = await db.collection('users').doc(uid).get();

    if(!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();

  return !!user;
}
