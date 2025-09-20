"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDown, ChevronRight, RefreshCcw, X, Copy } from "lucide-react";

export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(false);
  const [sprayModalVisible, setSprayModalVisible] = useState(false);
  const [depositModalVisible, setDepositModalVisible] = useState(false);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Normal");
  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const router = useRouter();

  // countdown
  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => setSeconds((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  return (
    <div className="min-h-screen bg-white px-5 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-black">You are welcome!</p>
        <Image
          src="/icons/notification.png"
          alt="notifications"
          width={25}
          height={25}
        />
      </div>

      {/* Balance */}
      <div className="mb-6">
        <p className="text-sm font-medium text-black">Current Balance</p>
        <p className="text-2xl font-bold text-black">₦0.000</p>
      </div>

      {/* Action Card */}
      <div className="border-[10px] border-yellow-400/25 rounded-3xl mb-6">
        <div className="border-[10px] border-yellow-400/50 rounded-2xl">
          <div className="flex items-center justify-between bg-yellow-400 rounded-lg p-4">
            <div>
              <p className="text-lg font-semibold mb-2">Make it Rain!</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setSprayModalVisible(true)}
                  className="bg-black text-white px-4 py-2 text-xs font-semibold rounded"
                >
                  Spray
                </button>
                <button
                  onClick={() => setDepositModalVisible(true)}
                  className="bg-white text-black px-4 py-2 text-xs font-semibold rounded"
                >
                  Deposit
                </button>
              </div>
            </div>
            <Image
              src="/images/floatingcoupons.png"
              alt="action"
              width={85}
              height={85}
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-gray-100 border border-gray-300/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-black">Notes</p>
          <ChevronRight size={18} />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {["₦1000", "₦100K", "₦500K", "₦1M"].map((amt) => (
            <div
              key={amt}
              className="border border-gray-300 rounded-lg py-3 flex flex-col items-center hover:bg-gray-200"
            >
              <span className="font-bold">{amt}</span>
              <span className="text-xs">1 Note</span>
            </div>
          ))}
        </div>
      </div>

      {/* Last Transaction */}
      <div className="bg-white border border-gray-300/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-black">Last Transaction</p>
          <ChevronDown size={18} />
        </div>
      </div>

      {/* Spray Modal */}
      {sprayModalVisible && (
        <div className="fixed inset-0 bg-black/40 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold">Control your spraying order</p>
              <button
                onClick={() => setSprayModalVisible(false)}
                className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded"
              >
                <RefreshCcw size={16} /> Reset
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Select Notes</p>
                <input
                  placeholder="Enter note"
                  className="w-full rounded bg-gray-100 px-3 py-2"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Amount</p>
                <input
                  placeholder="#190000"
                  className="w-full rounded bg-gray-100 px-3 py-2"
                />
              </div>
            </div>
            <button className="w-full bg-yellow-400 rounded py-3 mt-4 font-semibold">
              Spray
            </button>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {depositModalVisible && (
        <div className="fixed inset-0 bg-black/40 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-5">
            {!showBankTransfer ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-semibold">Deposit Details</p>
                  <button onClick={() => setDepositModalVisible(false)}>
                    <X size={22} />
                  </button>
                </div>
                <div className="space-y-4">
                  <input
                    placeholder="#100,000"
                    className="w-full rounded bg-gray-100 px-3 py-2"
                  />
                  <input
                    placeholder="100 Notes"
                    className="w-full rounded bg-gray-100 px-3 py-2"
                  />
                  <button
                    className="w-full bg-yellow-400 rounded py-3 font-semibold"
                    onClick={() => setShowBankTransfer(true)}
                  >
                    Proceed with Bank
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-semibold">Deposit Details</p>
                  <button onClick={() => setDepositModalVisible(false)}>
                    <X size={22} />
                  </button>
                </div>
                <p className="mb-3 text-sm">
                  Transfer to the account showing below
                </p>
                <div className="border p-4 rounded relative mb-4">
                  <div className="absolute top-[-10px] right-3 bg-yellow-400 rounded px-2 py-0.5 text-xs font-bold">
                    {seconds}
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Payment Method</span>
                    <span>Bank Transfer</span>
                  </div>
                  <div className="border-t my-1" />
                  <div className="flex justify-between mb-2">
                    <span className="text-xs bg-gray-100 px-2 rounded">
                      Name
                    </span>
                    <span>MONEY SPRAYING</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs bg-gray-100 px-2 rounded">
                      Bank Account
                    </span>
                    <div className="flex items-center gap-2">
                      <span>0872712892</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText("0872712892");
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                      >
                        <Copy size={16} className="text-yellow-400" />
                      </button>
                    </div>
                  </div>
                  {copied && (
                    <p className="text-xs text-yellow-500 text-right">
                      Copied!
                    </p>
                  )}
                  <div className="border-t my-1" />
                  <div className="flex justify-between">
                    <span className="text-xs bg-gray-100 px-2 rounded">
                      Bank Name
                    </span>
                    <span>Providus Cash Bank</span>
                  </div>
                </div>
                <input
                  placeholder="Amount Entered"
                  className="w-full rounded bg-gray-100 px-3 py-2 mb-4"
                />
                <div className="flex items-start gap-2 bg-yellow-100 rounded p-3 mb-4">
                  <Image
                    src="/icons/warning.png"
                    alt="warning"
                    width={20}
                    height={20}
                  />
                  <p className="text-xs text-yellow-600">
                    Note: Kindly transfer exact amount to this account shown
                    above, and also ensure to deposit before the time runs out
                  </p>
                </div>
                <button className="w-full bg-yellow-400 rounded py-3 font-semibold">
                  Click here after transfer
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
