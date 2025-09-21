"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ResponseCard from "../components/Res";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDiseaseMode, setIsDiseaseMode] = useState(false); // false = Market Analysis, true = Disease Detection

  // 🔹 Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // 🔹 Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = { type: "user", text: input, images: [] };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    handleSendToBackend();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage("");
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    console.log(files);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      const getRes = await fetch(`/api/get?key=${encodeURIComponent(data.key)}`);
      const getData = await getRes.json();
      console.log("Public URL:", getData.url);
      setImage(getData.url);
      setUploading(false);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const handleSendToBackend = async () => {
    setLoading(true);
    setImage("");
    try {
      // Choose API URL based on mode
      const apiurl = isDiseaseMode 
        ? "http://159.89.173.106:8000/disease-detection" // Disease detection endpoint
        : "http://159.89.173.106:8000/analyze";          // Market analysis endpoint

      const payload = {
        prompt: input,
        image_url: image,
      };

      const res = await fetch(apiurl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      console.log("Backend response:", data);

      setMessages((prev) => [
        ...prev,
        { type: "assistant", content: data },
      ]);
    } catch (error) {
      console.error("Error sending to backend:", error);
    } finally {
      setLoading(false);
    }
  };

  const marketStages = [
    "Analyzing...",
    "Market data collecting...",
    "Data processing...",
    "Almost ready...",
    "Response is ready and streaming..."
  ];

  const diseaseStages = [
    "Analyzing image...",
    "Disease pattern recognition...",
    "Comparing with disease database...",
    "Generating diagnosis...",
    "Treatment recommendations ready..."
  ];

  const stages = isDiseaseMode ? diseaseStages : marketStages;
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (loading) {
      interval = setInterval(() => {
        setCurrentStage((prev) => (prev + 1 < stages.length ? prev + 1 : prev));
      }, 2000); // change stage every 2s
    } else {
      setCurrentStage(0); // reset when loading is done
    }

    return () => clearInterval(interval);
  }, [loading, stages.length]);

  const handleModeToggle = () => {
    setIsDiseaseMode(!isDiseaseMode);
    // Optionally clear messages when switching modes
    // setMessages([]);
  };

  return (
    <div className="flex flex-col py-5 justify-between items-center h-screen mx-10">
      <div className="flex flex-col items-center">
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-400 text-2xl font-extrabold bg-clip-text text-transparent tracking-wide">
        CropMind AI
        </h1>
        
        {/* Mode Toggle */}
        <div className="mt-4 flex items-center gap-4 bg-[#2A2A2A] rounded-full p-1 shadow-lg">
          <button
            onClick={handleModeToggle}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              !isDiseaseMode
                ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            📊 Market Analysis
          </button>
          <button
            onClick={handleModeToggle}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              isDiseaseMode
                ? "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            🔬 Disease Detection
          </button>
        </div>

        {/* Mode Description */}
        <p className="mt-2 text-xs text-gray-400 text-center max-w-md">
          {isDiseaseMode 
            ? "Upload crop images to detect diseases and get treatment recommendations"
            : "Get market analysis, price predictions, and trading insights"
          }
        </p>
      </div>

      {/* Chat Messages */}
      <div className="p-5 mt-8 w-full h-screen overflow-y-scroll">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex items-start gap-2 mb-6">
            <Image
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src={
                msg.type === "user"
                  ? "https://randomuser.me/api/portraits/men/32.jpg"
                  : "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
              }
              alt="avatar"
              width={32}
              height={32}
            />
            <div>
              <p
                className={`font-semibold ${
                  msg.type === "user" 
                    ? "text-blue-400" 
                    : isDiseaseMode ? "text-red-400" : "text-green-400"
                }`}
              >
                {msg.type === "user" ? "You" : isDiseaseMode ? "Disease AI" : "Market AI"}
              </p>

              {msg.type === "assistant" && typeof msg.content === "object" ? (
                <ResponseCard data={msg.content.data} />
              ) : (
                <p className="text-white mt-2 text-sm leading-6 whitespace-pre-line">
                  {msg.text}
                </p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-2 mb-6">
            <Image
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
              alt="AI avatar"
              width={32}
              height={32}
            />
            <div className={`font-semibold mt-2 ${isDiseaseMode ? "text-red-400" : "text-green-400"}`}>
              {stages.slice(0, currentStage + 1).map((stage, idx) => (
                <p key={idx} className="animate-fadeIn">
                  {stage}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      {uploading ? (
        <div className="w-full my-2 max-w-3xl flex items-center gap-2">
          <span className="loader border-4 border-t-4 border-gray-200 border-t-green-500 rounded-full w-8 h-8 animate-spin"></span>
          <span className="text-white">Uploading image...</span>
        </div>
      ) : (
        image && (
          <div className="w-full my-2 max-w-3xl">
            <img
              src={image}
              alt="image"
              width={200}
              height={200}
              className="rounded-xl"
            />
          </div>
        )
      )}
      <div className="w-full max-w-3xl flex items-end gap-2 bg-[#2A2A2A] rounded-2xl px-4 py-2 shadow-lg">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          rows={1}
          placeholder={
            isDiseaseMode 
              ? "Describe symptoms or upload crop image for disease detection..."
              : "Ask about market trends, prices, or upload images for analysis..."
          }
          className="flex-1 resize-none bg-transparent text-white font-medium placeholder-gray-400 focus:outline-none p-2 max-h-40 overflow-y-auto"
        />

        <label className="flex items-center justify-center bg-[#3B3B3B] hover:bg-[#4A4A4A] transition-colors duration-200 text-white px-3 py-2 rounded-xl cursor-pointer">
          📎
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        <button
          onClick={handleSend}
          className={`${
            isDiseaseMode
              ? "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-400 hover:to-red-600"
              : "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600"
          } transition-all duration-200 text-white font-semibold px-4 py-2 rounded-xl shadow-md active:scale-95`}
        >
          ➤
        </button>
      </div>
    </div>
  );
}