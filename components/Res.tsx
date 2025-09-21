"use client";
import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function ResponseCard({ data }: { data: any }) {
    // If data.type is not "market", just show the raw JSON
    if (data?.type !== "market") {
        const { crop_detection, disease_detection, confidence_score, agricultural_keywords, image_url } = data;

        return (
            <div className="bg-[#1E1E1E] text-white p-5 rounded-xl w-[900px] space-y-5">
                {/* Crop Info */}
                <div>
                    <h2 className="text-lg font-bold text-green-400">🌱 Crop Information</h2>
                    <p><strong>Crop:</strong> {crop_detection?.crop_name}</p>
                    <p><strong>Variety:</strong> {crop_detection?.variety || "Not specified"}</p>
                    <p><strong>Growth Stage:</strong> {crop_detection?.growth_stage}</p>
                </div>

                {/* Disease Info */}
                <div>
                    <h2 className="text-lg font-bold text-red-400">🦠 Disease Detection</h2>
                    <p><strong>Disease:</strong> {disease_detection?.primary_condition}</p>
                    <p><strong>Affected Parts:</strong> {disease_detection?.affected_parts.join(", ")}</p>
                    <p><strong>Severity:</strong> {disease_detection?.severity}</p>
                    <p><strong>Symptoms:</strong> {disease_detection?.visible_symptoms.join(", ")}</p>
                    <p><strong>Type:</strong> {disease_detection?.disease_type}</p>
                </div>

                {/* Confidence */}
                <div>
                    <h2 className="text-lg font-bold text-blue-400">📊 Confidence</h2>
                    <p>{confidence_score}%</p>
                </div>

                {/* Keywords */}
                <div>
                    <h2 className="text-lg font-bold text-purple-400">🏷️ Keywords</h2>
                    <p>{agricultural_keywords?.join(", ")}</p>
                </div>

                {/* Image */}
                {image_url && (
                    <div className="mt-4">
                        <h2 className="text-lg font-bold text-yellow-400">🖼️ Image</h2>
                        <img src={image_url} alt="Crop" className="rounded-lg w-full max-w-[400px]" />
                    </div>
                )}
            </div>
        );
    }

    // Market response rendering
    const { crop_info, price_analysis } = data;
    // Prepare chart data from price_analysis.prices
    const chartData = Object.entries(price_analysis.prices).map(([market, price]) => ({
        market,
        price: price ? Number(price) : 0
    }));

    return (
        <div className="bg-[#1E1E1E] text-white p-5 rounded-xl space-y-5 w-[900px]">
            {/* Crop Info */}
            <img src={data?.image_url} className="w-40 h-40 rounded-lg" />
            <div>
                <h2 className="text-lg font-bold text-green-400">🌱 Crop Information</h2>
                <ul className="mt-2 text-sm space-y-1">
                    <li><span className="font-semibold">Crop:</span> {crop_info.crop_details.crop_name}</li>
                    <li><span className="font-semibold">Variety:</span> {crop_info.crop_details.variety || "N/A"}</li>
                    <li><span className="font-semibold">Growth Stage:</span> {crop_info.crop_details.growth_stage || "N/A"}</li>
                    <li><span className="font-semibold">Health:</span> {crop_info.health_codition}</li>
                    <li><span className="font-semibold">Confidence:</span> {crop_info.confidence}%</li>
                </ul>

                <div className="mt-2">
                    <span className="font-semibold">Keywords:</span>
                    <div className="flex gap-2 flex-wrap mt-1">
                        {crop_info.keywords.map((k: string, i: number) => (
                            <span key={i} className="bg-green-600/30 text-green-300 text-xs px-2 py-1 rounded-lg">
                                {k}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Price Analysis */}
            <div>
                <h2 className="text-lg font-bold text-blue-400">💰 Price Analysis</h2>
                <p className="text-sm mb-2">Unit: {price_analysis.normalized_unit}</p>

                {/* Chart Visualization */}
                <div className="bg-[#2A2A2A] p-4 rounded-lg">
                    <ResponsiveContainer width="100%" height={450}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="market" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: "#1E1E1E", borderRadius: "8px" }} />
                            <Bar dataKey="price" fill="#4ade80" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Original Listings */}
                <div className="mt-3">
                    <h3 className="font-semibold text-purple-400">🛒 Market Listings</h3>
                    {Object.entries(price_analysis.original_listings).map(([market, listings]) => (
                        <div key={market} className="mt-2">
                            <p className="font-semibold">{market}</p>
                            <ul className="list-disc ml-5 text-sm">
                                {(listings as string[]).map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {price_analysis.notes && (
                    <p className="mt-3 text-yellow-400 text-sm italic">
                        ⚠ {price_analysis.notes}
                    </p>
                )}
            </div>
        </div>
    );
}
