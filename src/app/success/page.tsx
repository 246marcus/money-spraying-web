"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-5">
      {/* Card */}
      <div className="w-[100%] bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg">
        {/* Success Image */}
        <Image
          src="/images/success.png"
          alt="Success"
          width={100}
          height={100}
          className="mb-5"
        />

        {/* Title */}
        <h1 className="font-inter font-bold text-xl text-black text-center mb-3">
          Connected <br /> successfully!
        </h1>

        {/* Subtitle */}
        <p className="font-inter font-medium text-base text-gray-800 text-center leading-6 mb-6">
          Spray mode unlocked — head to the <br /> home screen
        </p>

        {/* Button */}
        <button
          onClick={() => router.replace("/HomeScreen")}
          className="bg-yellow-400 w-full py-4 rounded-lg font-bold text-lg text-black mt-auto mb-10"
        >
          Home
        </button>
      </div>
    </div>
  );
}
