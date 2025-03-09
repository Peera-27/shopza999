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
      <h3 className="text-[60px] font-extrabold bg-gradient-to-r 
      from-orange-700 to-orange-200 text-transparent bg-clip-text ">Add Product</h3>
      <hr className="my-3" />
      <Link
        href={"/"}
        className="bg-[#FF165D] hover:bg-[#7E1717] inline-block text-white  py-2 px-2 rounded-md text-md transiton-all my-2"
      >
        Go back
      </Link>
      <form onSubmit={handleSubmit} className="my-5">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-[300px] block mb-2 bg-gray-200 border border-gray-400 text-gray-900 py-2 px-3 rounded-xl text-lg my-2"
          placeholder="Name of Product"
        />
        <input
          onChange={handleImageChange}
          type="file"
          className="w-[300px] block mb-2 bg-gray-200 border border-gray-400 text-gray-900 py-2 px-3 rounded-xl text-lg my-22"
          placeholder="img url"
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          className="w-[300px] block mb-2 bg-gray-200 border border-gray-400 text-gray-900 py-2 px-3 rounded-xl text-lg my-2"
          placeholder="Price"
        />
        <button
          type="submit"
          className="bg-[#3EC1D3] hover:bg-[#00ADB5] text-[#F6F7D7] py-2 px-4 rounded-md text-lg transition-all my-3"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
