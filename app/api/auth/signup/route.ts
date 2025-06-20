import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/db/models/UserModel";
import { connectDB } from "@/lib/db/mongoose";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password || password.length < 8) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already in use." }, { status: 409 });
    }
    const user = await User.create({ email, password });
    // Generate CSRF token
    const csrfToken = crypto.randomBytes(32).toString("hex");
    // Set CSRF token in cookie
    const res = NextResponse.json({ ok: true });
    res.cookies.set("csrfToken", csrfToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    // Set session cookie (for demo, use user id; in prod, use a session store or JWT)
    res.cookies.set("session", user._id.toString(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
} 