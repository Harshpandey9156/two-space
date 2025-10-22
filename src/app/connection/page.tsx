"use client"

import ConnectionCard from "@/components/ConnectionCard"
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Connection {
    id: string;
    name: string;
    avatar? : string;
    bio?: string;
}

const ConnectionPage = () => {

    const [connections, setConnections] = useState<Connection[]>([]);

    const {firebaseUser} = useAuth()

    useEffect (() => {
        const fetchConnections = async () => {
  if (!firebaseUser) return;

  try {
    const token = await firebaseUser.getIdToken();
    const res = await fetch("/api/connections", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (Array.isArray(data)) {
      setConnections(
        data.map((user: any) => ({
            id: user.uid,
            name: user.name,
            avatar: user.photoURL,
            bio: `Age: ${user.age}, Gender: ${user.gender}`,
        }))
);
    } else {
      console.warn("Connections API error:", data);
      setConnections([]);
    }
  } catch (error) {
    console.error("Failed to fetch connections:", error);
    setConnections([]);
  }
};

        fetchConnections();
    }, [firebaseUser])

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-4">
            <h1 className="font-bold text-2xl mb-4">Your connections</h1>
            {connections.length == 0 ? (
                <p className="text-gray-800">No connections yet.</p>
            ) : (       
                connections.map((conn) => (
                    <ConnectionCard
                    key={conn.id}
                    name={conn.name}
                    avatar={conn.avatar}
                    bio={conn.bio}
                    />
                ))
            ) }
        </div>
        
    )
}

export default ConnectionPage