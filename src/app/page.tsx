"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  // Handle Skip → jump to home
  const handleSkip = () => {
    router.push("/scanning/scan-now");
  };

  // Handle Next → go to next step
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push("/scanning/scan-now"); // final action
    }
  };

  return (
    <div className="flex flex-col items-center bg-white min-h-screen px-5">
      {/* Top image */}
      <Image
        src="/images/onboarding.png"
        alt="Onboarding"
        width={400}
        height={300}
        className="mt-10 mb-8 w-full h-[300px] object-contain"
      />

      {/* Progress bar */}
      <div className="flex flex-row gap-2 mt-5 mb-8">
        <div
          className={`h-[6px] rounded ${
            step === 1 ? "w-[30px] bg-black" : "w-[10px] bg-gray-300"
          }`}
        />
        <div
          className={`h-[6px] rounded ${
            step === 2 ? "w-[30px] bg-black" : "w-[10px] bg-gray-300"
          }`}
        />
        <div
          className={`h-[6px] rounded ${
            step === 3 ? "w-[30px] bg-black" : "w-[10px] bg-gray-300"
          }`}
        />
      </div>

      {/* Titles & subtitles */}
      {step === 1 && (
        <>
          <h1 className="text-2xl font-bold text-center mb-3 text-black">
            Welcome to MoneySpray
          </h1>
          <p className="text-base font-medium text-center text-black mb-10 px-2">
            Experience the fun of digital money spraying at events and parties
          </p>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="text-2xl font-bold text-center mb-3 text-black">
            Connect Your Spray Gun
          </h1>
          <p className="text-base font-medium text-center text-black mb-10 px-2">
            Quickly connect your spray gun using a QR code and start spraying
            instantly!
          </p>
        </>
      )}

      {step === 3 && (
        <>
          <h1 className="text-2xl font-bold text-center mb-3 text-black">
            Customize & Control
          </h1>
          <p className="text-base font-medium text-center text-black mb-16 px-2">
            Experience the fun of digital money spraying at events and parties
          </p>
        </>
      )}

      {/* Buttons */}
      {step < 3 ? (
        <div className="flex w-full justify-between px-5 mt-auto mb-10">
          <button
            onClick={handleSkip}
            className="text-lg font-bold text-black mt-4"
          >
            Skip
          </button>
          <button onClick={handleNext}>
            <Image
              src="/icons/next.png"
              alt="Next"
              width={50}
              height={50}
              className="w-[50px] h-[50px]"
            />
          </button>
        </div>
      ) : (
        <button
          onClick={handleNext}
          className="bg-yellow-400 w-full py-4 rounded-lg font-bold text-lg text-black mt-auto mb-10"
        >
          Start
        </button>
      )}
    </div>
  );
}
