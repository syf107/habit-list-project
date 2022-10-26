import React from "react";
import MakerList from "../components/MakerList";
function Maker() {
  return (
    <section className="w-7/12 mx-auto capitalize">
      <div className="flex items-center justify-between px-5 pt-5 pb-1 bg-slate-700 text-gray-200 border-b-10  border-none">
        <h2 className="text-3xl">habit list maker!</h2>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
        </div>
      </div>
      <MakerList />
    </section>
  );
}

export default Maker;
