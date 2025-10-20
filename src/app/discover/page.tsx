"use client"

import {collection, getDocs, doc, getDoc} from "firebase/firestore"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";

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
 interface Post {
  id: string;
  authorId: string;
  content: string;
  imageUrl: string;
  createdAt: any;
  isPublic: boolean;
  authorName?: string;
  authorPhoto?: string;

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
 
  const {firebaseUser, loading} = useAuth()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    if (!firebaseUser) {
      return;
    }

    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'))
      const allPosts : Post[] = [];

      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data()
        const post: Post = {
          id: docSnap.id,
          authorId: data.authorId,
          content: data.content,
          imageUrl: data.imageUrl,
          createdAt: data.createdAt,
          isPublic: data.isPublic,
        };

        if (data.authorId) {
          const authorRef = doc(db, "users", data.authorId);
          const authorSnap = await getDoc(authorRef);
          if (authorSnap.exists()) {
            const authorData = authorSnap.data();
            post.authorName = authorData.name || "Anonymous"
            post.authorPhoto = authorData.photoUrl || "/default-avatar.jpg"
          }
        }

        allPosts.push(post)
      }
      setPosts(allPosts)
    }

    fetchPosts()
  }, [firebaseUser])
 
  if (loading || !firebaseUser){
    return (
      <p>Loading...</p>
    )
  }
    
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
 
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Discover</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length === 0 && <p>No posts found.</p>}

        {posts.map((p) => (
          <div key={p.id} className="bg-white shadow rounded-lg p-4">
            <img
              src={p.imageUrl || "/default-post.png"}
              alt={p.content}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <div className="flex items-center gap-2 mb-2">
              <img
                src={p.authorPhoto || "/default-avatar.png"}
                alt={p.authorName}
                className="w-8 h-8 rounded-full"
              />
              <p className="font-medium">{p.authorName}</p>
            </div>
            <p className="text-gray-700">{p.content}</p>
 
          </div>
        ))}
      </div>
    </div>
  )
}