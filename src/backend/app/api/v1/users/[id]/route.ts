import { NextRequest, NextResponse } from "next/server";
import { mockUserUpdate } from "./mock";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Mock: atualizar usuário
  return NextResponse.json(mockUserUpdate(id));
}
