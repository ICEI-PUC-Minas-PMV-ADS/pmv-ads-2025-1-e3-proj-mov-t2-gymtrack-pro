import { NextRequest, NextResponse } from "next/server";
import { mockFinancialReport } from "./mock";

export async function GET(request: NextRequest) {
  // Mock: relatório financeiro
  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month") || "2024-06";
  return NextResponse.json(mockFinancialReport(month));
}
