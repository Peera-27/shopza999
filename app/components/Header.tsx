"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }
  if (pathname === "/register") {
    return null;
  }

  const listmenu = [
    { name: "Add Item", path: "/additem" },
    { name: "Delete Item", path: "/deleteitem" },
    { name: "Update Item", path: "/updateitem" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  return (
    <header className="p-4 border-b">
      <nav className="flex gap-2">
        {listmenu.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <Button variant="outline">{menu.name}</Button>
          </Link>
        ))}
      </nav>
    </header>
  );
}
