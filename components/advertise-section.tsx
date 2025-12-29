import Link from "next/link";

export function AdvertiseSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-black pb-1">
          Advertise
        </h2>
      </div>

      <div className="w-full p-10  overflow-hidden">
          <img
            src="/exceed.jpg"
            alt="Advertisement"
            className="object-contain w-full h-full"
          />
      </div>
      
    </div>
  );
}
