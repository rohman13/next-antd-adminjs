import app from "@/app/utils/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export async function POST(request) {
  const data = await request.json();
  try {
    const auth = getAuth(app);
    const userRecord = await createUserWithEmailAndPassword(auth, data.email, data.password);

    console.log('Successfully created new user:', userRecord);
    return new Response(JSON.stringify({ message: 'User created successfully', uid: userRecord.uid }), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (error) {
    console.error('Error creating new user:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}