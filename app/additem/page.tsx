"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateItempage() {
  const [name, setName] = useState("");
  const [img, setImage] = useState("");
  const [price, setPrice] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !img || !price) return;
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, img, price }),
      });
      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item", error);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setImage(base64 as string);
    }
  };

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Add Product</h3>
      <hr className="my-3" />
      <Link
        href={"/"}
        className="bg-gray-500 inline-block text-white  py-2 px-3 rounded my-2"
      >
        Go back
      </Link>
      <form onSubmit={handleSubmit} className="my-5">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Name of Product"
        />
        <input
          onChange={handleImageChange}
          type="file"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="img url"
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Price"
        />
        <button
          type="submit"
          className="bg-green-500 py-2 px-3 rounded text-lg my-2"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
