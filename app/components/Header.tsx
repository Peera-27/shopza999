"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // ใช้ usePathname
import { Button } from "@/components/ui/button";

export default function Header() {
  const [showNav, setShowNav] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // ตรวจสอบเส้นทางปัจจุบันใน client-side
    setShowNav(pathname !== "/login" && pathname !== "/register");
  }, [pathname]);

  const listmenu = [
    { name: "Add Item", path: "/additem" },
    { name: "Delete Item", path: "/deleteitem" },
    { name: "Update Item", path: "/updateitem" },
    { name: "Login", path: "/login" },
    { name: "Regis", path: "/register" },
  ];

  return (
    <header className="p-4 border-b flex flex-col gap-4">
      {showNav && (
        // เมนูนำทาง
        <nav className="flex gap-2">
          {listmenu.map((menu, index) => (
            <Link key={index} href={menu.path}>
              <Button variant="outline">{menu.name}</Button>
            </Link>
          ))}
        </nav>
      )}

      {/* คอมโพเนนต์ค้นหา */}
      {showNav && <SearchItems />}
    </header>
  );
}

function SearchItems() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="ค้นหาสินค้า..."
        className="border p-2 rounded"
      />
      <Button onClick={handleSearch} className="bg-blue-500 text-white">
        ค้นหา
      </Button>
    </div>
  );
}
