import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { connectToDb } from "../db";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const { db } = await connectToDb();

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);

    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
