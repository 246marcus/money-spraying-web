"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ScanNow() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center bg-white min-h-screen px-5">
      {/* Top images */}
      <div className="relative w-full h-[300px] mt-10 mb-8 flex items-center justify-center">
        {/* Container with relative positioning */}
        <div className="relative ">
          {/* Background image */}
          <Image
            src="/images/onboarding.png"
            alt="Onboarding background"
            width={300}
            height={300}
            className="object-contain"
          />

          {/* Overlay image (centered on top) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/scanphone.png"
              alt="Scan phone"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-black text-center mb-3">
        Connect Your Spray Gun
      </h1>

      {/* Subtitle */}
      <p className="text-base font-medium text-black text-center mb-16 px-2">
        To begin spraying, connect your phone to the money spray gun by scanning
        the QR code on the device
      </p>

      {/* Scan Now button */}
      <button
        onClick={() => router.replace("/QRCode")}
        className="bg-yellow-400 w-full py-4 rounded-lg font-bold text-lg text-black mt-auto mb-10"
      >
        Scan Now
      </button>
    </div>
  );
}
