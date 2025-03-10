"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [successfull, setSuccessfull] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }
    if (!name || !email || !password || !confirmpassword || !location || !phonenumber) {
      setError("Please fill all fields");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phonenumber, password, location }),
    });

    if (res.ok) {
      const form = e.target as HTMLFormElement;
      setError("");
      setSuccessfull("Registration successful");
      form.reset();
    } else {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF8EF]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
        <h1 className="text-center text-3xl font-extrabold 
        bg-gradient-to-l from-[#F96E2A] to-orange-200 text-transparent bg-clip-text">Register</h1>
        <hr className="my-4" />

        {error && <div className="bg-red-500 text-white text-center py-2 rounded-md">{error}</div>}
        {successfull && <div className="bg-green-500 text-white text-center py-2 rounded-md">{successfull}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md bg-[#C9E6F0] placeholder-gray-600"
            type="text" placeholder="Username"
          />
          <input 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md bg-[#C9E6F0] placeholder-gray-600"
            type="email" placeholder="Email"
          />
          <input 
            onChange={(e) => setPhonenumber(e.target.value)}
            className="w-full p-2 border rounded-md bg-[#C9E6F0] placeholder-gray-600"
            type="text" placeholder="Phone Number"
          />
          <input 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md bg-[#C9E6F0] placeholder-gray-600"
            type="password" placeholder="Password"
          />
          <input 
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-md bg-[#C9E6F0] placeholder-gray-600"
            type="password" placeholder="Confirm Password"
          />
          <input 
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded-md bg-[#C9E6F0] placeholder-gray-600"
            type="text" placeholder="Location"
          />

          <button
            className="w-full p-2 bg-[#F96E2A] border text-white rounded-md hover:bg-orange-400 hover:border-[#F96E2A] h transition-all"
            type="submit"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? 
          <Link href="/login" className="text-[#78B3CE] hover:underline ml-1">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
