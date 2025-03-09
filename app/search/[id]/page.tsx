"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Search(params) {
  const itemId = params.id;
  interface Item {
    name: string;
    img?: string;
    price: number;
  }

  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    getbyid(itemId);
  }, [itemId]);

  const getbyid = async (id: string) => {
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch `);
      }
      const data = await res.json();
      if (data.post) {
        setItem(data.post); // ตั้งค่า state เป็น object โดยตรง
      } else {
        setItem(null); // หรือ setItem({}) ขึ้นอยู่กับว่าคุณต้องการให้ state เป็นอย่างไรเมื่อไม่มีข้อมูล
      }
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };
  return (
    <div className="container mx-auto my-3">
      <div className="grid grid-cols-4 mt-3 gap-5">
        {item ? (
          <div className="shadow-xl my-10 p-10 rounded-xl">
            <h3>{item.name}</h3>
            {item.img && (
              <Image src={item.img} width={200} height={200} alt={item.name} />
            )}
            <p>{item.price}</p>
          </div>
        ) : (
          <div>
            <h1>No items</h1>
            <p>Debug: Item state is {JSON.stringify(item)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
