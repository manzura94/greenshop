import { NextResponse } from "next/server";
import { connectToDb } from "../../db";

export async function GET() {
  try {
    const { db } = await connectToDb();

    const aggregationPipeline = [
      {
        $group: {
          _id: {
            $toLower: { $ifNull: ["$category", "unassigned"] },
          },
          count: { $sum: 1 },
        },
      },
    ];

    const aggregationResult = await db
      .collection("products")
      .aggregate(aggregationPipeline)
      .toArray();

    const counts = aggregationResult.reduce(
      (acc, item) => {
        acc[item._id] = item.count;
        return acc;
      },
      {} as Record<string, number>,
    );

    return NextResponse.json(counts);
  } catch (error) {
    console.error("Error fetching category counts:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
