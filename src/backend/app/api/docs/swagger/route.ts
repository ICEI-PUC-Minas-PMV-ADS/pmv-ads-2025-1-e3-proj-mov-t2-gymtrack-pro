import { NextResponse } from 'next/server';
import swaggerJson from './swagger.json';

export async function GET() {
  return NextResponse.json(swaggerJson);
}