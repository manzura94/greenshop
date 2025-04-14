import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../db";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query") || "";

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const { db } = await connectToDb();

    const results = await db
      .collection("products")
      .find({ name: { $regex: query, $options: "i" } })
      .limit(10)
      .toArray();

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
