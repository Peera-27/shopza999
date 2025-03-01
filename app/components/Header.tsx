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

      {showNav}
    </header>
  );
}
