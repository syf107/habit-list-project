function Window({ string }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-2 bg-slate-700 text-gray-200 border-b-10  border-none">
      <h2 className="text-3xl">habit list {string}!</h2>
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
      </div>
    </div>
  );
}

export default Window;
