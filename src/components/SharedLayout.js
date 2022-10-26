import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";

function SharedLayout() {
  return (
    <main className="bg-orange-300 h-screen px-3 py-4">
      <h1 className="text-gray-800 text-5xl font-bold  text-center mb-10">
        Habit List App
      </h1>
      <Navbar />
      <Outlet />
    </main>
  );
}

export default SharedLayout;
