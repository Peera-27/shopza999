"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ใช้ useRouter จาก next/navigation แทน next/router

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // ใช้งาน useRouter จาก next/navigation

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log("API Response:", data);

    if (response.ok) {
      if (data.user && data.user.name) {
        localStorage.setItem("token", data.token);
        alert(`Login success, welcome ${data.user.name}`);
        router.push("/");
      } else {
        setError("User data is missing or invalid.");
      }
    } else {
      alert(data.message);
    }
  }

  return (
    <div>
      <div className="container mx-auto py-4">
        <h1>Login</h1>
        <hr className="my-3" />
        <form onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-500 w-fit text-white py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            className="block bg-gray-200 p-2 my-2 rounded-md"
            type="email"
            placeholder="Email"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            className="block bg-gray-200 p-2 my-2 rounded-md"
            type="password"
            placeholder="Password"
          />

          <button
            className="bg-green-500 p-2 rounded-md text-white"
            type="submit"
            disabled={!email || !password} // ปิดปุ่ม Submit ถ้ากรอกข้อมูลไม่ครบ
          >
            Login
          </button>
        </form>
        <hr className="my-3" />
        <p>
          Don&apos;t have an account{" "}
          <Link className="text-black-500 hover:underline" href={"/register"}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
