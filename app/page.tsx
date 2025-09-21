"use client";
import React from "react";
import Chat from "./Chat";

export default function page() {
  const data = [
    "Imagine a man is talking",
    "make an image monkey is climb",
    "what is loop in js",
    "how to write class is js",
    "how to make an app",
  ];
  return (
    <div className="bg-[#1E1E1E]">


      {/* New prompt/save prpmt/save image button */}
      
      <Chat />
    </div>
  );
}
