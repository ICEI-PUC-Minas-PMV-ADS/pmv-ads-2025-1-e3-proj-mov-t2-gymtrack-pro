import { NextRequest, NextResponse } from "next/server";
import { mockUserCreated } from "./mock";

export async function POST(request: NextRequest) {
  // Mock: criar usuário
  return NextResponse.json(mockUserCreated, { status: 201 });
}
