"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

export default function OurSpace() {
  const { firebaseUser, loading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    if (!loading && firebaseUser) {
      const fetchMyPosts = async () => {
        try {
          const postsRef = collection(db, "posts");
          const q = query(postsRef, where("authorId", "==", firebaseUser.uid));
          const querySnapshot = await getDocs(q);

          const myPosts: Post[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Post[];

          // Sort posts by createdAt descending (latest first)
          myPosts.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

          setPosts(myPosts);
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingPosts(false);
        }
      };

      fetchMyPosts();
    }
  }, [firebaseUser, loading]);

  if (loading || loadingPosts) return <p>Loading posts...</p>;
  if (!firebaseUser) return <p>You must be logged in to view posts</p>;
  if (posts.length === 0) return <p>No posts yet. Create your first post.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">My Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-4 shadow-sm">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post"
              className="rounded-lg mb-2 max-h-64 w-full object-cover"
            />
          )}
          <p>{post.content}</p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(post.createdAt?.seconds * 1000).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
