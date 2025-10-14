"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hook/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Checking authentication...</p>
      </div>
    );
  }
 
  if (!user) {
    router.push("/auth");
    return null;
  }
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center w-96">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, {user.email}
        </h1>
        <p className="text-gray-500 mb-6">  
          You’re successfully logged in 🎉
        </p>
        <button
          onClick={async () => {
            await signOut(auth);
            router.push("/auth");
          }}
          className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
