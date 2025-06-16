import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/utils/auth";
import { users } from "@/db/schema/users";

// GET - Buscar todos os usuários (apenas para admins)
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    // Verificar se é admin
    const [currentUser] = await db.select().from(users).where(eq(users.id, decoded.id));
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    // Buscar todos os usuários
    const allUsers = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      goal: users.goal,
      isActive: users.isActive
    }).from(users);

    return NextResponse.json({ users: allUsers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
  }
}