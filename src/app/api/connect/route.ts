import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function POST(req: Request) {
  const { token, userId } = await req.json();

  const client = await clientPromise;
  const db = client.db("mydb");
  const sessions = db.collection("sessions");
  const result = await sessions.findOneAndUpdate(
    { token, status: "pending" },
    { $set: { status: "connected", userId, connectedAt: new Date() } },
    { returnDocument: "after" } // ensures we return the updated doc
  );

  if (!result || !result.value) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
