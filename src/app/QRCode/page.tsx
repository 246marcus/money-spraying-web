"use client";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function QrPage() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchToken() {
      const res = await fetch("/session");
      const data = await res.json();
      setToken(data.token);
    }
    fetchToken();
  }, []);

  // Poll every 2s to check if connected
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(async () => {
      const res = await fetch(`/session/${token}`);
      const data = await res.json();
      if (data.status === "connected") {
        clearInterval(interval);
        router.replace("/HomeScreen");
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [token]);

  if (!token) {
    return <p className="text-center">Loading QR...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-5 md:hidden">
      <QRCodeCanvas
        value={`https://manilla.finance/connect?session=${token}`}
        size={220}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      />

      <h1 className="text-xl font-bold text-black mt-6 text-center">
        Scan to Connect
      </h1>
    </div>
  );
}
