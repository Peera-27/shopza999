"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default async function UpdateItempage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { itemId } = await params;
  const [item, setItem] = useState({ name: "", image: "", price: "" });
  const [newname, setnewname] = useState("");
  const [newimage, setnewimage] = useState("");
  const [newprice, setnewprice] = useState("");
  const router = useRouter();

  const getpostbyid = async (itemId: string) => {
    try {
      const res = await fetch(`/api/items/${itemId}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch `);
      }
      const data = await res.json();
      setItem(data.post);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };
  useEffect(() => {
    getpostbyid(itemId);
  }, [itemId]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newname, newimage, newprice }),
      });
      if (!res.ok) {
        throw new Error("Failed to edit item");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error editing item", error);
    }
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setnewimage(base64 as string);
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
      <h3
        className="text-[60px] font-extrabold bg-gradient-to-r 
      from-orange-600 to-purple-600 text-transparent bg-clip-text "
      >
        Edit Product
      </h3>
      <hr className="my-3" />
      <Link
        href={"/"}
        className="bg-[#FF165D] hover:bg-[#7E1717] inline-block text-white  py-2 px-2 rounded-md text-md transiton-all my-2"
      >
        Go back
      </Link>
      <form onSubmit={handleSubmit} className="my-5">
        <input
          onChange={(e) => setnewname(e.target.value)}
          type="text"
          className="w-[300px] block mb-2 bg-gray-200 border border-gray-400 text-gray-900 py-2 px-3 rounded-xl text-lg my-2"
          placeholder={item.name}
        />
        <input
          onChange={handleImageChange}
          type="file"
          className="w-[300px] block mb-2 bg-gray-200 border border-gray-400 text-gray-900 py-2 px-3 rounded-xl text-lg my-2"
          placeholder={item.image}
        />
        <input
          onChange={(e) => setnewprice(e.target.value)}
          type="number"
          className="w-[300px] block mb-2 bg-gray-200 border border-gray-400 text-gray-900 py-2 px-3 rounded-xl text-lg my-2"
          placeholder={item.price}
        />
        <button
          type="submit"
          className="bg-[#3EC1D3] hover:bg-[#00ADB5] text-[#F6F7D7] py-2 px-4 rounded-md text-lg transition-all my-3"
        >
          Edit Product
        </button>
      </form>
    </div>
  );
}
