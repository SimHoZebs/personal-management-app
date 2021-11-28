
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

import readFirebaseConfig from "../api/connectToFirebase";
import readUser from "../api/readUser";
import createUser from "../api/createUser";

export default async function authentication() {

  const firebaseConfig = await readFirebaseConfig();
  if (firebaseConfig instanceof Error) {
    return firebaseConfig;
  }
  initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;
  const googleUser = result.user;
  if (!googleUser.displayName) {
    const error = new Error("user has no display name");
    console.log(error.message);
    return error;
  }

  let user = await readUser(googleUser.uid);
  if (user === null) {
    user = await createUser(googleUser.uid, googleUser.displayName);
  }
  return user;

}