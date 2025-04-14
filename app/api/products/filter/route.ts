import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../db";

export async function POST(req: NextRequest) {
  const {
    category,
    size,
    priceRange,
    isNew,
    sale,
    page = 1,
    limit = 9,
  } = await req.json();
  const skip = (page - 1) * limit;

  try {
    const { db } = await connectToDb();

    const matchStage: Record<string, unknown> = {
      ...(category && { category }),
      ...(size && { size }),
      ...(priceRange && {
        numericPrice: {
          $gte: priceRange[0],
          $lte: priceRange[1],
        },
      }),
      ...(isNew && { isNew: true }),
      ...(sale && { sale: true }),
    };

    const pipeline = [
      { $addFields: { numericPrice: { $toDouble: "$price" } } },
      { $match: matchStage },
    ];

    const products = await db
      .collection("products")
      .aggregate([...pipeline, { $skip: skip }, { $limit: limit }])
      .toArray();

    const countResult = await db
      .collection("products")
      .aggregate([...pipeline, { $count: "count" }])
      .toArray();
    const totalCount = countResult[0]?.count || 0;
    console.log(Math.ceil(totalCount / limit), "total");

    return NextResponse.json({
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error filtering products:", error);
    return NextResponse.json(
      { error: "Failed to filter products" },
      { status: 500 },
    );
  }
}
