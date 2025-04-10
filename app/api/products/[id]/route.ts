import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const idParam = searchParams.get("id");
  if (!idParam) {
    return new NextResponse("Missing product ID", { status: 400 });
  }
  const productId = parseInt(idParam);
  if (isNaN(productId)) {
    return new NextResponse("Invalid product ID", { status: 400 });
  }

  try {
    const { db } = await connectToDb();

    const product = await db.collection("products").findOne({ id: productId });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
