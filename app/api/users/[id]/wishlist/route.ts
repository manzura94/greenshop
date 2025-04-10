import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../../db";

export async function GET(req: NextRequest) {
  const { db } = await connectToDb();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  if (!userId) return NextResponse.json([]);

  const wishlist = await db.collection("wishlists").findOne({ userId });

  if (!wishlist) return NextResponse.json([]);

  const wishlistProducts = await db
    .collection("products")
    .find({ id: { $in: wishlist.wishListIds } })
    .toArray();

  return NextResponse.json(wishlistProducts);
}

export async function POST(req: NextRequest) {
  const { db } = await connectToDb();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  const { productId } = await req.json();

  if (!userId || !productId) return NextResponse.json([]);

  const updatedWishlist = await db
    .collection("wishlists")
    .findOneAndUpdate(
      { userId },
      { $addToSet: { wishListIds: productId } },
      { upsert: true, returnDocument: "after" },
    );

  const wishlistProducts = await db
    .collection("products")
    .find({ id: { $in: updatedWishlist?.wishListIds } })
    .toArray();

  return NextResponse.json(wishlistProducts);
}

export async function DELETE(req: NextRequest) {
  const { db } = await connectToDb();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  const { productId } = await req.json();

  if (!userId || !productId) return NextResponse.json([]);

  const updatedWishlist = await db
    .collection("wishlists")
    .findOneAndUpdate(
      { userId },
      { $pull: { wishListIds: productId } },
      { returnDocument: "after" },
    );

  if (!updatedWishlist) return NextResponse.json([]);

  const wishlistProducts = await db
    .collection("products")
    .find({ id: { $in: updatedWishlist.wishListIds } })
    .toArray();

  return NextResponse.json(wishlistProducts);
}
