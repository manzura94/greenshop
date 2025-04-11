import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../db";

export async function POST(req: NextRequest) {
  const { category, size, priceRange, isNew, sale } = await req.json();

  try {
    const { db } = await connectToDb();
    const filters: { [key: string]: unknown } = {};

    if (category) filters.category = category;
    if (size) filters.size = size;
    if (priceRange && Array.isArray(priceRange)) {
      filters.price = {
        $gte: priceRange[0],
        $lte: priceRange[1],
      };
    }
    if (isNew) filters.isNew = true;
    if (sale) filters.sale = true;

    const products = await db.collection("products").find(filters).toArray();

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error filtering products:", error);
    return NextResponse.json(
      { error: "Failed to filter products" },
      { status: 500 },
    );
  }
}
