import { NextRequest, NextResponse } from "next/server";
import { mockRoutines, mockRoutineCreated } from "./mock";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Mock: listar fichas de treino
  return NextResponse.json(mockRoutines(id));
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Mock: criar ficha de treino
  return NextResponse.json(mockRoutineCreated(id), { status: 201 });
}
