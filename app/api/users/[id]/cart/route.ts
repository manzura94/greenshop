import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../../db";

interface Cart {
  userId: string;
  cartItems: { productId: number; quantity: number }[];
}

export async function GET(req: NextRequest) {
  const { db } = await connectToDb();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json([]);
  }

  const userCart = await db.collection("carts").findOne({ userId });
  const cartItems = userCart?.cartItems ?? [];

  if (cartItems.length === 0) {
    return NextResponse.json([]);
  }

  const productIds = cartItems.map(
    (item: { productId: number }) => item.productId,
  );

  const cartProducts = await db
    .collection("products")
    .find({ id: { $in: productIds } })
    .toArray();

  const result = cartProducts.map((product) => {
    const cartItem = cartItems.find(
      (item: { productId: number }) => item.productId === product.id,
    );
    return {
      ...product,
      quantity: cartItem?.quantity ?? 1,
    };
  });
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const { db } = await connectToDb();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  const body = await req.json();
  const productId = body.productId;
  const action = body.action;

  if (!userId || !productId) {
    return NextResponse.json([]);
  }

  const carts = db.collection<Cart>("carts");

  if (action === "increment") {
    const cart = await carts.findOne({
      userId,
      "cartItems.productId": productId,
    });

    if (cart) {
      await carts.updateOne(
        { userId, "cartItems.productId": productId },
        { $inc: { "cartItems.$.quantity": 1 } },
      );
    } else {
      await carts.updateOne(
        { userId },
        { $push: { cartItems: { productId, quantity: 1 } } },
        { upsert: true },
      );
    }
  } else if (action === "decrement") {
    const cart = await carts.findOne({
      userId,
      "cartItems.productId": productId,
    });
    const currentQuantity =
      cart?.cartItems.find((i) => i.productId === productId)?.quantity || 1;

    if (currentQuantity > 1) {
      await carts.updateOne(
        { userId, "cartItems.productId": productId },
        { $inc: { "cartItems.$.quantity": -1 } },
      );
    } else {
      await carts.updateOne(
        { userId },
        { $pull: { cartItems: { productId } } },
      );
    }
  } else {
    const cart = await carts.findOne({
      userId,
      "cartItems.productId": productId,
    });
    if (cart) {
      await carts.updateOne(
        { userId, "cartItems.productId": productId },
        { $inc: { "cartItems.$.quantity": 1 } },
      );
    } else {
      await carts.updateOne(
        { userId },
        { $push: { cartItems: { productId, quantity: 1 } } },
        { upsert: true },
      );
    }
  }

  const userCart = await carts.findOne({ userId });
  const productIds = userCart?.cartItems.map((i) => i.productId) ?? [];

  const cartProducts = await db
    .collection("products")
    .find({ id: { $in: productIds } })
    .toArray();

  const result = cartProducts.map((product) => {
    const cartItem = userCart?.cartItems.find(
      (i) => i.productId === product.id,
    );
    return {
      ...product,
      quantity: cartItem?.quantity ?? 1,
    };
  });

  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
  const { db } = await connectToDb();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  const body = await req.json();
  const productId = body.productId;

  if (!userId || !productId) {
    return NextResponse.json(
      { error: "Missing userId or productId" },
      { status: 400 },
    );
  }

  const carts = db.collection<Cart>("carts");

  await carts.updateOne({ userId }, { $pull: { cartItems: { productId } } });

  const userCart = await carts.findOne({ userId });
  const productIds = userCart?.cartItems.map((i) => i.productId) ?? [];

  const cartProducts = await db
    .collection("products")
    .find({ id: { $in: productIds } })
    .toArray();

  const result = cartProducts.map((product) => {
    const cartItem = userCart?.cartItems.find(
      (item: { productId: number; quantity: number }) =>
        item.productId === product.id,
    );
    return {
      ...product,
      quantity: cartItem?.quantity ?? 1,
    };
  });

  return NextResponse.json(result);
}
