"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Deletebutton from "./components/delete";
interface Product {
  _id: string;
  img: string;
  name: string;
  price: number;
}

export default function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
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
      <h1 className="text-[70px] font-extrabold text-center bg-gradient-to-tr
       from-orange-300 to-[#E9762B] text-transparent bg-clip-text">
        🛒 Shopza999
      </h1>
      <hr className="my-4 border-[#E9762B]" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products && products.length > 0 ? (
          products.map((item) => (
            <div
              key={item._id}
              className="bg-orange-50 border border-[#d85b22] rounded-lg p-3 shadow-md hover:shadow-xl transition-all"
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
              <h3 className="text-lg font-semibold mt-2 text-teal-600 line-clamp-2">
                {item.name}
              </h3>
              <p className="text-lg font-bold text-[#F96E2A] mt-1">
                ฿{item.price}
              </p>

              <div className="flex justify-between items-center mt-3">
                <Link
                  className="bg-[#E9762B] hover:bg-[#d85b22] text-white px-4 py-3 rounded-md text-sm transition-all"
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
