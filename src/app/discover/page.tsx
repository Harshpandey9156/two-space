import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../context/AuthContext"; // or however you get current user
import { useState, useEffect } from "react";

export default function Discover() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const allUsers = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.id !== currentUser.uid); // exclude self
      setUsers(allUsers);
    };

    fetchUsers();
  }, [currentUser]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Discover</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          </div>
        ))}
      </div>
    </div>
  );
}
