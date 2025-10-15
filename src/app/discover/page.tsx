"use client";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  age: number;
  bio?: string;
  photoURL?: string;
  gender?: string;
  interests?: string[];
  lookingFor?: string;
  uid: string;
}

export default function Discover() {
  const { currentUser, loading } = useAuth(); // get loading state from context
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const allUsers: User[] = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as User))
        .filter((user) => user.uid !== currentUser.uid);  
      setUsers(allUsers);
    };

    fetchUsers();
  }, [currentUser]);

  if (loading || !currentUser) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Discover</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.length === 0 && <p>No users found.</p>}
        {users.map((u) => (
          <div key={u.id} className="bg-white shadow rounded-lg p-4">
            <img
              src={u.photoURL || "/default-avatar.png"}
              alt={u.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-bold">{u.name}</h2>
            <p className="text-sm text-gray-600">{u.age} years</p>
            <p className="text-sm text-gray-700">{u.bio || "No bio yet."}</p>
            <p className="text-sm text-gray-500">
              Gender: {u.gender || "Not specified"}
            </p>
            <p className="text-sm text-gray-500">
              Looking for: {u.lookingFor || "Not specified"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
