"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Deletebutton from "./components/delete";
export default function Homepage() {
  const [products, setProducts] = useState([]);
  const getitem = async () => {
    try {
      const res = await fetch("/api/items", {
        method: "GET",
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.items);
      } else {
        throw new Error(`Failed to fetch `);
      }
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };
  useEffect(() => {
    getitem();
  }, []);
  return (
    <div className="min-h-screen bg-[#ffffff] px-4 py-5">
    <h1 className="text-4xl font-bold text-center text-[#78B3CE]">
      🛒 Shopza999
    </h1>
    <hr className="my-4 border-[#78B3CE]" />

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products && products.length > 0 ? (
        products.map((item) => (
          <div
            key={item._id}
            className="bg-[#C9E6F0] border border-[#78B3CE] rounded-lg p-3 shadow-md hover:shadow-xl transition-all"
          >
            <div className="relative w-full h-40">
              <Image
                src={item.img}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                alt={item.name}
              />
            </div>
            <h3 className="text-md font-semibold mt-2 text-[#78B3CE] line-clamp-2">
              {item.name}
            </h3>
            <p className="text-lg font-bold text-[#F96E2A] mt-1">
              ฿{item.price}
            </p>

            <div className="flex justify-between items-center mt-3">
              <Link
                className="bg-[#F96E2A] hover:bg-[#d85b22] text-white px-4 py-3 rounded-md text-sm transition-all"
                href={`/updateitem/${item._id}`}
              >
                Edit
              </Link>
              <Deletebutton id={item._id} />
            </div>
          </div>
        ))
      ) : (
        <h1 className="col-span-full text-center text-gray-600 text-xl">
          No items
        </h1>
      )}
    </div>
  </div>
);
}
