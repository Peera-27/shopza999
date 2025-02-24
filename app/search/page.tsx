"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Item {
  _id: string;
  name: string;
  email: string;
  age: number;
  item: string;
  price: number;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [data, setData] = useState<Item[]>([]);
  const [notfound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/items?keyword=${encodeURIComponent(keyword)}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const items: Item[] = await response.json();

        if (items.length === 0) {
          setNotFound(true);
        } else {
          setData(items);
          setNotFound(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setNotFound(true);
      }
    };

    if (keyword) {
      fetchData();
    }
  }, [keyword]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">ผลการค้นหา: {keyword}</h1>

      {notfound ? (
        <div className="text-red-500 mt-4">ไม่พบข้อมูล</div>
      ) : (
        <div className="space-y-2 mt-4">
          {data.map((item) => (
            <div key={item._id} className="border p-4 rounded">
              <h2 className="text-lg font-semibold">{item.item}</h2>
              <p>Price: {item.price} Bath</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
