import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/db/models/UserModel";
import { connectDB } from "@/lib/db/mongoose";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }
    const valid = await user.comparePassword(password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }
    // Generate CSRF token
    const csrfToken = crypto.randomBytes(32).toString("hex");
    // Set cookies
    const res = NextResponse.json({ ok: true });
    res.cookies.set("csrfToken", csrfToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
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