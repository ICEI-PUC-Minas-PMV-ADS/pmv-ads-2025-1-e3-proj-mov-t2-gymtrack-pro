import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { generateToken, verifyPassword } from "@/utils/auth";

interface UserRequest {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password }: UserRequest = await request.json();
  
    if (!email || !password) return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 }); 

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  
    if (!(await verifyPassword(password, user.passwordHash))) return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });

    const token = await generateToken(user);

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, goal: user.goal }, token });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao conectar ao banco de dados" }, { status: 500 });
  }
}
