"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { auth } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function OnboardingPage() {
  const router = useRouter();
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [interests, setInterests] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!user) return alert("Please login first!");
  setLoading(true);
  console.log("Starting profile save...");

  try {
    let photoURL = "";

    if (photo) {
      console.log("Uploading photo...");
      const photoRef = ref(storage, `profiles/${user.uid}/${photo.name}`);
      await uploadBytes(photoRef, photo);
      photoURL = await getDownloadURL(photoRef);
      console.log("Photo uploaded:", photoURL);
    }

    console.log("Saving Firestore data...");
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name,
      age: Number(age),
      gender,
      lookingFor,
      interests: interests.split(",").map((i) => i.trim()),
      photoURL,
      createdAt: new Date(),
    });

    console.log("Firestore save done");
    setMessage("Profile created successfully!");
    router.push("/discover");
  } catch (error: any) {
    console.error("Error saving profile:", error);
    setMessage("Error: " + error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-pink-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-rose-600 mb-6">
          Complete Your Profile 💖
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <select
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Looking For...</option>
            <option value="friendship">Friendship</option>
            <option value="dating">Dating</option>
            <option value="longterm">Long-term</option>
            <option value="work">Colleagues</option>
          </select>

          <input
            type="text"
            placeholder="Interests (comma separated)"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            className="w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 text-white py-2 rounded hover:bg-rose-600"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-4 text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}
