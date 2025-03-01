"use client";
import React from "react";
export default function Deletebutton({ id }) {
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
    <button
      onClick={handleDelete}
      className="bg-red-500 border text-white px-3 py-2 rounded-md text-lg my-2"
    >
      Delete
    </button>
  );
}
