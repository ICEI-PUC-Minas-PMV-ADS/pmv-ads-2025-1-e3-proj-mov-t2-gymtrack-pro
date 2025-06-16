import { NextRequest, NextResponse } from "next/server";
import { db } from "@/backend/db";
import { attendance } from "@/backend/db/schema/attendance";
import { eq, and } from "drizzle-orm";
import { auth } from "@/backend/auth";

// GET: Detalhe de uma presença
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const result = await db.select().from(attendance).where(and(eq(attendance.id, params.id), eq(attendance.userId, session.user.id)));
  if (!result.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(result[0]);
}

// PUT: Atualiza presença
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { date, present } = await request.json();
  const updated = await db.update(attendance).set({
    date: date ? new Date(date) : undefined,
    present,
    updatedAt: new Date(),
  }).where(and(eq(attendance.id, params.id), eq(attendance.userId, session.user.id))).returning();
  if (!updated.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated[0]);
}

// DELETE: Remove presença
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const deleted = await db.delete(attendance).where(and(eq(attendance.id, params.id), eq(attendance.userId, session.user.id))).returning();
  if (!deleted.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "Deleted" });
}
