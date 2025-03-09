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
  bg-gradient-to-r from-[#E9762B] to-orange-300 
  text-white text-center text-4xl md:text-6xl lg:text-[70px] font-extrabold
  shadow-lg drop-shadow-xl">
      🛒 Shopza999
      {showNav && (
        // เมนูนำทาง
        <nav className="flex justify-end gap-2">
          {listmenu.map((menu, index) => (
            <Link key={index} href={menu.path}>
              <Button className = "relative text-white text-lg font-semibold after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full" 
              variant="ghost">{menu.name}</Button>
            </Link>
          ))}
        </nav>
      )}

      {showNav}
    </header>
  );
}
