"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name || !password) {
      setError("Please fill all fields");
      return;
    }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.user && data.user.name) {
        localStorage.setItem("token", data.token);
        router.push("/");
      } else {
        setError("User data is missing or invalid.");
      }
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FBF8EF]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center text-[#F96E2A]">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-500 text-white py-2 px-4 rounded-md">
              {error}
            </div>
          )}
          <input
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-md bg-[#C9E6F0] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#78B3CE]"
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md bg-[#C9E6F0] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#78B3CE]"
            type="password"
            placeholder="Password"
          />
          <button
            className="w-full p-3 text-white bg-[#F96E2A] rounded-md hover:bg-[#d85b1e]"
            type="submit"
            disabled={!name || !password}
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link className="text-[#78B3CE] hover:underline" href="/register">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
