import { NextRequest, NextResponse } from "next/server";
import { mockUserPlan } from "./mock";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Mock: consultar plano atribuído a usuário
  return NextResponse.json(mockUserPlan(id));
}
