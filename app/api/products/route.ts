import { connectToDb } from "../db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "9");
  const skip = (page - 1) * limit;

  try {
    const { db } = await connectToDb();

    const products = await db
      .collection("products")
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalCount = await db.collection("products").countDocuments();

    return NextResponse.json({
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
