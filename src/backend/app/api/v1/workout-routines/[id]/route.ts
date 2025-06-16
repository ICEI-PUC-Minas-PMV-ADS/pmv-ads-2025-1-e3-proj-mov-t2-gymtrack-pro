import { NextRequest, NextResponse } from "next/server";
import { workoutRoutines } from "@/backend/db/schema/workoutRoutines";
import { eq, and } from "drizzle-orm";
import { auth } from "@/backend/auth";
import { db } from "@/db/db";

// GET: Detalhe de uma ficha
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const result = await db.select().from(workoutRoutines).where(and(eq(workoutRoutines.id, params.id), eq(workoutRoutines.userId, session.user.id)));
  if (!result.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(result[0]);
}

// PUT: Atualiza ficha
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, description, exercises } = await request.json();
  const updated = await db.update(workoutRoutines).set({
    name,
    description,
    exercises,
    updatedAt: new Date(),
  }).where(and(eq(workoutRoutines.id, params.id), eq(workoutRoutines.userId, session.user.id))).returning();
  if (!updated.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated[0]);
}

// DELETE: Remove ficha
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const deleted = await db.delete(workoutRoutines).where(and(eq(workoutRoutines.id, params.id), eq(workoutRoutines.userId, session.user.id))).returning();
  if (!deleted.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "Deleted" });
}
