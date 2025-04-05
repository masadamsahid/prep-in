import { db } from "@/lib/firebase/admin";

export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
  const interviews = await db
    .collection('interviews')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get()
  ;

  if (interviews.empty) return null;

  return interviews.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Interview[];
}


export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;


  const interviews = await db
    .collection('interviews')
    .where('finalized', '==', true)
    .where('userId', '!=', userId)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get()
    ;

  if (interviews.empty) return null;

  return interviews.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Interview[];
}


export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db
    .collection('interviews')
    .doc(id)
    .get()
  ;

  return interview.data() as Interview | null;
}

