import { NextRequest, NextResponse } from "next/server";
import { mockLoginResponse } from "./mock";

export async function POST(request: NextRequest) {
  // Mock: autenticação
  return NextResponse.json(mockLoginResponse);
}
