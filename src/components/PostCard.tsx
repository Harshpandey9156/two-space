"use client";
import React, { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

const CLOUDINARY_CLOUD_NAME = "dhhof74np";
const CLOUDINARY_UPLOAD_PRESET = "posts_unsigned";

const PostCard = () => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setMessage("You must be logged in...");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";

      // Upload image to Cloudinary if present
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const cloudData = await cloudRes.json();
        imageUrl = cloudData.secure_url;
      }

      // Send post data to backend
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorId: user.uid,
          content,
          imageUrl,
          isPublic: false,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create post");

      setMessage("Post created successfully!");
      setContent("");
      setImage(null);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something..."
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PostCard;
