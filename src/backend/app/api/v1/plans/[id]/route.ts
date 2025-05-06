import { NextRequest, NextResponse } from "next/server";
import { mockPlanUpdate } from "./mock";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Mock: editar plano
  return NextResponse.json(mockPlanUpdate(id));
}
