import { NextRequest, NextResponse } from "next/server";
import { mockGoalUpdate } from "./mock";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Mock: atualizar meta mensal
  return NextResponse.json(mockGoalUpdate(id));
}
