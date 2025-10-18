"use client";

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useProtectedRoute } from "@/hook/useProtectedRoute";

interface UserProfile {
  name: string;
  age: number;
  lookingFor: string,
  interests: string[];
}

export default function ProfilePage() {
  const { user, loading } = useProtectedRoute();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile({
          name: data.name || "",
          age: data.age || 0,
          lookingFor: data.lookingFor || '',
          interests: data.interests || [],
        });
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">
          Welcome, {profile?.name}
        </h1>

        <p className="text-gray-700">
          <strong>Age:</strong> {profile?.age}
        </p>

        <p className="text-gray-700">
          <strong>Looking for:</strong> {profile?.lookingFor}
        </p>

        <p className="text-gray-700">
          <strong>Interests:</strong> {profile?.interests.join(", ")}
        </p>

        <button
          onClick={async () => await signOut(auth)}
          className="bg-rose-500 text-white px-4 py-2 rounded mt-4 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
