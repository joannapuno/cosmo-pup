"use client";

import Image from "next/image";
import CosmoPup1 from "../assets/cosmo-pup-1.png";
import CosmoPup2 from "../assets/cosmo-pup-2.png";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const messages: string[] = [
  "Welcome to the Bark Command Center!",
  "Our paw-some control room is the place to be if you want to witness the most tail-wagging rocket launches in the galaxy...",
  "So grab your leash and trot on down to the Bark Command Center for the ulti-mutt launch experience!",
];

export default function LaunchControlModal({ isOpen, onClose }: Props) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setMessageIndex(0); // Reset on open
  }, [isOpen]);

  const isLastMessage = messageIndex === messages.length - 1;

  const handleClick = () => {
    if (isLastMessage) {
      onClose();
    } else {
      setMessageIndex((prev) => prev + 1);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity ${
        isOpen ? "z-50" : "-z-10"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal content */}
      <div
        className={`relative text-gray-700 bg-white p-6 rounded-lg max-w-md w-full space-y-4 shadow-xl transition-all duration-300 mx-4 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="grid justify-center">
          {!isLastMessage ? (
            <Image
              src={CosmoPup1}
              width={150}
              style={{ width: "auto" }}
              alt="intro illustration"
              priority
            />
          ) : (
            <Image
              src={CosmoPup2}
              width={150}
              style={{ width: "auto" }}
              alt="intro illustration"
              priority
            />
          )}
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold">Cosmo Pup</h1>

          <div className="my-2 flex justify-center items-center">
            <p>{messages[messageIndex]}</p>
          </div>

          <button
            onClick={handleClick}
            className="w-full bg-indigo-600 text-white font-semibold py-2 mt-8 rounded hover:bg-indigo-700"
          >
            {isLastMessage ? "OK!" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
