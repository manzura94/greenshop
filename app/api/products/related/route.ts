// app/api/related-products/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../db";


export async function POST(req: NextRequest) {
  const { db } = await connectToDb();
  const { cartProductIds } = await req.json(); 


  const productsInCart = await db
    .collection("products")
    .find({ id: { $in: cartProductIds } })
    .toArray();


  const categories = [...new Set(productsInCart.map((p) => p.category))];


  const related = await db
    .collection("products")
    .find({
      category: { $in: categories },
      id: { $nin: cartProductIds },
    })
    .limit(8)
    .toArray();

  return NextResponse.json(related);
}

  