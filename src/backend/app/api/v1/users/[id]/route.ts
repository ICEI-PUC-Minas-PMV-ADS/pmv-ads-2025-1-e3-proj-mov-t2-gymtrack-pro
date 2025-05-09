import { NextRequest, NextResponse } from "next/server";
import { UpdateUser, users } from "@/db/schema/users";
import { hashPassword } from "@/utils/auth";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";

type RequestBody = Omit<UpdateUser, "passwordHash"> & {
  password: string;
};

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { name, goal, password, isActive } : RequestBody = await request.json();
    
    const updates: any = {};
    if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
    
    if (name) updates.name = name;
  
    if (goal) updates.goal = goal;
  
    if (password) updates.passwordHash = hashPassword(password);
  
    if (isActive !== undefined) updates.active = isActive;
  
    if (Object.keys(updates).length === 0) return NextResponse.json({ error: "Nada para atualizar" }, { status: 400 });
   
    const [user] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
   
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, goal: user.goal } });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao conectar ao banco de dados" }, { status: 500 });
  }
}
