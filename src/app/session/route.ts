import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import clientPromise from ".././../../lib/mongodb";

export async function GET() {
  const token = randomUUID();

  const client = await clientPromise;
  const db = client.db("mydb");
  const sessions = db.collection("sessions");

  await sessions.insertOne({
    token,
    status: "pending",
    createdAt: new Date(),
  });

  return NextResponse.json({ token });
}
