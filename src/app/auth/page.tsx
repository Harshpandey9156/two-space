"use client";
import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Account created!");
        router.push('/onboarding')
      }

    } catch (error: any) {
      
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-rose-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-2 rounded hover:bg-rose-600"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center mt-3 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have one?"}{" "}
          <button
            className="text-rose-500 underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>

        {message && (
          <p className="text-center text-sm mt-4 text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
