"use client";
import React from "react";
interface DeleteButtonProps {
  id: string;
}

export default function Deletebutton({ id }: DeleteButtonProps) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
      if (res.ok) {
        console.log("Item deleted successfully");
        window.location.reload();
      } else {
        const errorData = await res.json();
        console.error("Failed to delete:", errorData);
      }
    }
  };

  return (
    // <div className="flex justify-between items-center">
    <button
      onClick={handleDelete}
      className="bg-[#D71313] hover:bg-[#7E1717] text-white px-4 py-3 rounded-md text-sm transition-all"
    >
      Delete
    </button>
    // </div>
  );
}
