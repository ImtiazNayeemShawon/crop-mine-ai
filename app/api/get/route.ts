import { NextRequest, NextResponse } from "next/server";
import { getObjectURL } from "@/utils/s3";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const key = searchParams.get("key");

        if (!key) {
            return NextResponse.json({ error: "Missing key" }, { status: 400 });
        }

        const url = await getObjectURL(key);
        return NextResponse.json({ url });
    } catch (err) {
        console.error("URL error:", err);
        return NextResponse.json({ error: "Failed to get URL" }, { status: 500 });
    }
}
