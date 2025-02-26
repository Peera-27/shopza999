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
    if (password != confirmpassword) {
      setError("Password do not Match");
      return;
    }
    if (
      !name ||
      !email ||
      !password ||
      !confirmpassword ||
      !location ||
      !phonenumber
    ) {
      setError("Please fill all fields");
      return;
    }

    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phonenumber, password, location }),
    });
    if (res.ok) {
      const form = e.target as HTMLFormElement;
      setError("");
      setSuccessfull("Registration successful");
      form.reset();
    } else {
      console.log("error");
    }
  };

  return (
    <div>
      <div className="container mx-auto py-4">
        <h1>Register</h1>
        <hr className="my-3" />
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 w-fit text-white py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          {successfull && (
            <div className="bg-green-500 w-fit text-white py-1 px-3 rounded-md mt-2">
              {successfull}
            </div>
          )}

          <input
            onChange={(e) => setName(e.target.value)}
            className="block bg-gray-200 p-2 my-2 rounded-md"
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="block bg-gray-200 p-2 my-2 rounded-md"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPhonenumber(e.target.value)}
            className="block bg-gray-200 p-2 my-2 rounded-md"
            type="text"
            placeholder="Phonenumber"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="block bg-gray-200 p-2 my-2 rounded-md"
            type="password"
            placeholder="Password"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block bg-gray-200 p-2 my-2 rounded-md"
            type="password"
            placeholder="Confirm Password"
          />
          <input
            onChange={(e) => setLocation(e.target.value)}
            className="block bg-gray-200 p-2 my-2 rounded-md"
            type="text"
            placeholder="Location"
          />
          <button
            className="bg-green-500 p-2 rounded-md text-white"
            type="submit"
          >
            Register
          </button>
        </form>
        <hr className="my-3" />
        <p>
          Alreagy have an account{" "}
          <Link className="text-black-500 hover:underline" href={"/login"}>
            Sing in
          </Link>
        </p>
      </div>
    </div>
  );
}
