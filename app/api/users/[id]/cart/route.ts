import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../../db";

export async function GET(req: NextRequest) {
  const { db } = await connectToDb();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  if (!userId) {
    return NextResponse.json([]);
  }
  const userCart = await db.collection("carts").findOne({ userId });

  if (!userCart || !userCart.cartIds || userCart.cartIds.length === 0) {
    return NextResponse.json([]);
  }

  const cartProducts = await db
    .collection("products")
    .find({ id: { $in: userCart.cartIds } })
    .toArray();
  return NextResponse.json(cartProducts);
}

export async function POST(req: NextRequest) {
  const { db } = await connectToDb();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  const body = await req.json();
  const productId = body.productId;

  if (!userId || !productId) {
    return NextResponse.json([]);
  }

  const updatedCart = await db
    .collection("carts")
    .findOneAndUpdate(
      { userId },
      { $addToSet: { cartIds: productId } },
      { upsert: true, returnDocument: "after" },
    );

  const cartProducts = await db
    .collection("products")
    .find({ id: { $in: updatedCart?.cartIds } })
    .toArray();

  return NextResponse.json(cartProducts);
}

export async function DELETE(req: NextRequest) {
  const { db } = await connectToDb();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  const body = await req.json();
  const productId = body.productId;

  const updatedCart = await db.collection("carts").findOneAndUpdate(
    {
      userId,
    },
    { $pull: { cartIds: productId } },
    { returnDocument: "after" },
  );

  if (!updatedCart) {
    return NextResponse.json([]);
  }

  const cartProducts = await db
    .collection("products")
    .find({ id: { $in: updatedCart.cartIds || [] } })
    .toArray();
  return NextResponse.json(cartProducts);
}
