import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/utils/auth";
import { workoutRoutines } from "@/db/schema/workoutRoutines";
import { users } from "@/db/schema/users";

// GET - Buscar rotinas de treino do usuário
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

    // Verificar se é um admin tentando acessar dados de outro usuário
    const url = new URL(request.url);
    const targetUserId = url.searchParams.get('userId');
    
    let userIdToQuery = decoded.id;
    
    if (targetUserId && targetUserId !== decoded.id) {
      // Verificar se é admin
      const [currentUser] = await db.select().from(users).where(eq(users.id, decoded.id));
      if (!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
      }
      userIdToQuery = targetUserId;
    }

    const userRoutines = await db
      .select()
      .from(workoutRoutines)
      .where(eq(workoutRoutines.userId, userIdToQuery));

    return NextResponse.json({ routines: userRoutines }, { status: 200 });
  } catch (error) {
    console.error("Error fetching workout routines:", error);
    return NextResponse.json({ error: "Erro ao buscar rotinas de treino" }, { status: 500 });
  }
}

// POST - Criar nova rotina de treino
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const { name, description, exercises } = await request.json();
    
    if (!name || !exercises) {
      return NextResponse.json({ error: "Nome e exercícios são obrigatórios" }, { status: 400 });
    }

    const [newRoutine] = await db
      .insert(workoutRoutines)
      .values({
        userId: decoded.id,
        name,
        description: description || "",
        exercises: JSON.stringify(exercises)
      })
      .returning();

    return NextResponse.json({ routine: newRoutine }, { status: 201 });
  } catch (error) {
    console.error("Error creating workout routine:", error);
    return NextResponse.json({ error: "Erro ao criar rotina de treino" }, { status: 500 });
  }
}

// PUT - Atualizar rotina de treino
export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const { id, name, description, exercises } = await request.json();
    
    if (!id || !name || !exercises) {
      return NextResponse.json({ error: "ID, nome e exercícios são obrigatórios" }, { status: 400 });
    }

    const [updatedRoutine] = await db
      .update(workoutRoutines)
      .set({
        name,
        description: description || "",
        exercises: JSON.stringify(exercises),
        updatedAt: new Date()
      })
      .where(eq(workoutRoutines.id, id))
      .returning();

    if (!updatedRoutine) {
      return NextResponse.json({ error: "Rotina não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ routine: updatedRoutine }, { status: 200 });
  } catch (error) {
    console.error("Error updating workout routine:", error);
    return NextResponse.json({ error: "Erro ao atualizar rotina de treino" }, { status: 500 });
  }
}

// DELETE - Deletar rotina de treino
export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    await db
      .delete(workoutRoutines)
      .where(eq(workoutRoutines.id, id));

    return NextResponse.json({ message: "Rotina removida com sucesso" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting workout routine:", error);
    return NextResponse.json({ error: "Erro ao remover rotina de treino" }, { status: 500 });
  }
}
