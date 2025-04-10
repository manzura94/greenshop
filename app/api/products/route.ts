import { connectToDb } from "../db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDb();
    const products = await db.collection("products").find({}).toArray();
    console.log(products);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
