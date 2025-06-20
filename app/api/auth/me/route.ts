import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/db/models/UserModel";
import { connectDB } from "@/lib/db/mongoose";

export async function GET(req: NextRequest) {
  await connectDB();
  const session = req.cookies.get("session")?.value;
  if (!session) {
    return NextResponse.json({ user: null });
  }
  const user = await User.findById(session).select("email _id");
  if (!user) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({ user });
} 