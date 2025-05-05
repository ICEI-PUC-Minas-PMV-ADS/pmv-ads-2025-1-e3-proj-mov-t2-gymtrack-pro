import { NextRequest, NextResponse } from "next/server";
import { mockMe, mockMeUpdated } from "./mock";

export async function GET(request: NextRequest) {
  // Mock: ver perfil próprio
  return NextResponse.json(mockMe);
}

export async function PUT(request: NextRequest) {
  // Mock: atualizar perfil próprio
  return NextResponse.json(mockMeUpdated);
}
