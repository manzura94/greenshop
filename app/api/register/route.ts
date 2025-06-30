import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDb } from "../db";

const JWT_SECRET = process.env.JWT_SECRET!;

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

    const token = jwt.sign(
      { email: newUser.email, username: newUser.username },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    return NextResponse.json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
