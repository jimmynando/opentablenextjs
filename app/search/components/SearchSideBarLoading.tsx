export default function SearchSideBarLoading() {
  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        <div className="animate-pulse bg-slate-200 w-20 h-3 overflow-hidden border cursor-pointer"></div>
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        <div className="animate-pulse bg-slate-200 w-20 h-3 overflow-hidden border cursor-pointer"></div>
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="animate-pulse bg-slate-200 w-20 h-3 overflow-hidden border cursor-pointer"></div>
      </div>
    </div>
  );
}
