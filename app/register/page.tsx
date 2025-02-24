"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Home() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phonenumber: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "ไม่สามารถสร้างผู้ใช้ได้");
      }

      toast.success("สร้างผู้ใช้สำเร็จ!");
      console.log("ข้อมูลผู้ใช้ที่สร้าง:", data);
      setFormData({
        username: "",
        email: "",
        password: "",
        phonenumber: "",
        location: "",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "ไม่สามารถสร้างผู้ใช้ได้"
      );
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">สร้างผู้ใช้ใหม่</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              ชื่อผู้ใช้
            </label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="กรุณากรอกชื่อผู้ใช้"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              อีเมล
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="กรุณากรอกอีเมล"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              รหัสผ่าน
            </label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="กรุณากรอกรหัสผ่าน"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phonenumber"
              className="block text-sm font-medium mb-1"
            >
              เบอร์โทรศัพท์
            </label>
            <Input
              id="phonenumber"
              type="tel"
              value={formData.phonenumber}
              onChange={(e) =>
                setFormData({ ...formData, phonenumber: e.target.value })
              }
              placeholder="กรุณากรอกเบอร์โทรศัพท์"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium mb-1"
            >
              ที่อยู่
            </label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="กรุณากรอกที่อยู่"
            />
          </div>

          <Button type="submit" className="w-full">
            สร้างผู้ใช้
          </Button>
        </form>
      </div>
    </div>
  );
}
