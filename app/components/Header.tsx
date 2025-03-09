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
    { name: "Register", path: "/register" },
  ];
  useEffect(() => {
    if (pathname === "/login" || pathname === "/register") {
        document.body.classList.add("hide-header");
    } else {
        document.body.classList.remove("hide-header");
    }
}, [pathname]);

  return (
    <header className="p-5 border-b flex flex-col gap-4 
    bg-gradient-to-r from-[#E9762B] to-orange-300 ">
      {showNav && (
        // เมนูนำทาง
        <nav className="flex justify-end gap-2">
          {listmenu.map((menu, index) => (
            <Link key={index} href={menu.path}>
              <Button className = "bg-[#fffe] border-white text-black hover:bg-[#d85b22] hover:text-white hover:border-[#d85b22]" 
              variant="outline">{menu.name}</Button>
            </Link>
          ))}
        </nav>
      )}

      {showNav}
    </header>
  );
}
