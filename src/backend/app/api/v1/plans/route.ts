import { NextRequest, NextResponse } from "next/server";
import { mockPlans } from "./mock";

export async function GET(request: NextRequest) {
  // Mock: listar planos
  return NextResponse.json({ plans: mockPlans });
}
