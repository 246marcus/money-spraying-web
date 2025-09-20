import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function GET(
  req: Request,
  context: { params: Promise<{ token: string }> } // 👈 params is async
) {
  const { token } = await context.params;

  const client = await clientPromise;
  const db = client.db("mydb");
  const sessions = db.collection("sessions");

  const session = await sessions.findOne({ token });

  if (!session) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db
    .collection("sessions")
    .updateOne({ token }, { $set: { status: "authenticated" } });

  return NextResponse.redirect(new URL("/success", req.url), { status: 303 });
}
