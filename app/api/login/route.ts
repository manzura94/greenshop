import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const { emailOrUsername, password } = await req.json();

  if (!emailOrUsername || !password) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const { db } = await connectToDb();

  const user = await db.collection("users").findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new NextResponse("Invalid password", { status: 401 });
  }

  const token = jwt.sign(
    { email: user.email, username: user.username, id: user._id.toString() },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  return NextResponse.json({ token });
}
