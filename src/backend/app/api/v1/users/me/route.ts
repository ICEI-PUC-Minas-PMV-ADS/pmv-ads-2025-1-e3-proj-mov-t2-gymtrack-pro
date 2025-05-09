import { db } from "@/db/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
    }
    const token = authHeader.replace("Bearer ", "");
    const payload = await verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }
    const id = payload.id;
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, goal: user.goal } });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao conectar ao banco de dados" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
    }
    const token = authHeader.replace("Bearer ", "");
    const payload = await verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }
    const id = payload.id;
    const { name, goal, password, isActive } = await request.json();
    const updates: any = {};
    if (name) updates.name = name;
    if (goal) updates.goal = goal;
    if (password) {
      // Supondo que exista uma função hashPassword semelhante ao exemplo
      const { hashPassword } = await import("@/utils/auth");
      updates.passwordHash = hashPassword(password);
    }
    if (isActive !== undefined) updates.active = isActive;
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "Nada para atualizar" }, { status: 400 });
    }
    const [user] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, goal: user.goal } });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao conectar ao banco de dados" }, { status: 500 });
  }
}
