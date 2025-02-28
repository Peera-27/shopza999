"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
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
    <div className="container mx-auto my-3">
      <h1>Welcom to Shopza999</h1>
      <hr className="my-3" />
      <div className="grid grid-cols-4 mt-3 gap-5">
        {products && products.length > 0 ? (
          products.map((item) => (
            <div key={item._id} className="shadow-xl my-10 p-10 rounded-xl">
              <h3>{item.name}</h3>
              <Image
                src={item.img}
                width={200}
                height={200}
                alt={item.name}
              ></Image>
              <p>{item.price}</p>
              <div className="mt-5">
                <Link
                  className="bg-gray-500 border text-white px-3  py-2 rounded-md text-lg my-2"
                  href={`/updateitem/${item._id}`}
                >
                  Edit
                </Link>
                <Link
                  className="bg-red-500 border text-white px-3 py-2 rounded-md text-lg my-2"
                  href={`/deleteitem/${item._id}`}
                >
                  Delete
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h1>No items</h1>
        )}
      </div>
    </div>
  );
}
