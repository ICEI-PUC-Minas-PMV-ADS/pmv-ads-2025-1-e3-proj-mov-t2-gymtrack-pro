import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { generateToken, hashPassword } from "@/utils/auth";
import { InsertUser, users } from "@/db/schema/users";

type NewUser = Omit<InsertUser, "passwordHash"> & {
  password: string;
  isAdmin?: boolean;
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, goal, isAdmin }: NewUser = await request.json();

    const existing = await db.select().from(users).where(eq(users.email, email));

    if (existing.length > 0) return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 });
    
    const passwordHash = await hashPassword(password);
    const role = isAdmin ? "ADMIN" : "STUDENT";
    const [user] = await db.insert(users).values({ name, email, passwordHash, goal, role }).returning();
    const token = await generateToken(user);

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, goal: user.goal }, token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao conectar ao banco de dados" }, { status: 500 });
  }
}
