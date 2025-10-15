// firebaseAdmin.ts
import admin from "firebase-admin";

console.log("--- firebaseAdmin.ts: Module evaluation started ---"); // <-- Add this!
console.log("Current process.env.NODE_ENV:", process.env.NODE_ENV); // <-- Add this!

if (!admin.apps.length) {
  console.log("Attempting to initialize Firebase Admin SDK for the first time...");
  console.log("DEBUG: process.env.FIREBASE_STORAGE_BUCKET =", process.env.FIREBASE_STORAGE_BUCKET);
  console.log("DEBUG: process.env.FIREBASE_PROJECT_ID =", process.env.FIREBASE_PROJECT_ID); // Also check projectId
  console.log("DEBUG: admin.apps.length (before init) =", admin.apps.length); // Check this

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
    console.log("Firebase Admin SDK initialization attempt finished. admin.apps.length (after init) =", admin.apps.length);
  } catch (error) {
    console.error("ERROR: Firebase Admin SDK initialization failed:", error); // Catch potential init errors
  }
} else {
  console.log("Firebase Admin SDK already initialized, skipping new initialization.");
  console.log("DEBUG: admin.apps.length (already initialized) =", admin.apps.length); // Verify this
}

export const adminDB = admin.firestore();
export const adminStorage = admin.storage();
console.log("--- firebaseAdmin.ts: Module evaluation finished ---"); // <-- Add this!
