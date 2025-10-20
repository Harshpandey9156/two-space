"use client";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

interface UserProfile {
  id: string;
  name?: string;
  age?: number;
  bio?: string;
  photoURL?: string;
  gender?: string;
  interests?: string[];
  lookingFor?: string;
  uid?: string;
  email?: string;
}

export default function Discover() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const allUsers: UserProfile[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserProfile[];

     
      // const filteredUsers = allUsers.filter((u) => u.uid !== user.uid);
      setUsers(allUsers);
      setLoading(false);
    };

    fetchUsers();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-rose-50 p-6">
      <h1 className="text-3xl font-bold text-rose-600 mb-6 text-center">
        Discover People
      </h1>

      {users.length === 0 && (
        <p className="text-center text-gray-500">No users found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => (
          <div key={u.id} className="bg-white shadow-lg rounded-xl p-4">
            <img
              src={u.photoURL || "/default-avatar.png"}
              alt={u.name || "User"}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {u.name || "Unnamed User"}
            </h2>
            <p className="text-sm text-gray-600">{u.age ? `${u.age} years` : ""}</p>
            <p className="text-sm text-gray-700">{u.bio || "No bio provided."}</p>
            <p className="text-sm text-gray-500">Gender: {u.gender || "N/A"}</p>
            <p className="text-sm text-gray-500">
              Looking for: {u.lookingFor || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
