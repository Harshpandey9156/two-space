"use client";

import { useProtectedRoute } from "@/hook/useProtectedRoute";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ProfilePage() {
  const { user, loading } = useProtectedRoute();

  if (loading) return <p>Loading...</p>;
  if (!user) return null; // Redirect handled automatically

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-xl font-semibold">Welcome {user.email}</h1>
        <button
          onClick={async () => await signOut(auth)}
          className="bg-rose-500 text-white px-4 py-2 rounded mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
