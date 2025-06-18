import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { eq, and, desc } from "drizzle-orm";
import { verifyToken } from "@/utils/auth";
import { attendance } from "@/db/schema/attendance";
import { users } from "@/db/schema/users";
import { workoutRoutines } from "@/db/schema/workoutRoutines";

// GET - Buscar presenças do usuário
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

    const userAttendances = await db
      .select({
        id: attendance.id,
        userId: attendance.userId,
        date: attendance.date,
        present: attendance.present,
        description: attendance.description,
        createdAt: attendance.createdAt,
        updatedAt: attendance.updatedAt,
        workoutRoutine: {
          id: workoutRoutines.id,
          name: workoutRoutines.name,
          description: workoutRoutines.description,
        }
      })
      .from(attendance)
      .leftJoin(workoutRoutines, eq(attendance.workoutRoutineId, workoutRoutines.id))
      .where(eq(attendance.userId, userIdToQuery))
      .orderBy(desc(attendance.date));

    return NextResponse.json({ attendances: userAttendances }, { status: 200 });
  } catch (error) {
    console.error("Error fetching attendances:", error);
    return NextResponse.json({ error: "Erro ao buscar presenças" }, { status: 500 });
  }
}

// POST - Criar ou atualizar presença
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

    const { date, present, workoutRoutineId, description, userId: targetUserId } = await request.json();
    
    if (!date || typeof present !== 'boolean') {
      return NextResponse.json({ error: "Data e status são obrigatórios" }, { status: 400 });
    }

    // Determinar para qual usuário criar/atualizar a presença
    let userIdToUse = decoded.id;
    
    if (targetUserId && targetUserId !== decoded.id) {
      // Verificar se é admin
      const [currentUser] = await db.select().from(users).where(eq(users.id, decoded.id));
      if (!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
      }
      userIdToUse = targetUserId;
    }

    // Verificar se já existe uma entrada para essa data
    const existingAttendance = await db
      .select()
      .from(attendance)
      .where(
        and(
          eq(attendance.userId, userIdToUse),
          eq(attendance.date, new Date(date))
        )
      );

    if (existingAttendance.length > 0) {
      // Atualizar registro existente
      const [updatedAttendance] = await db
        .update(attendance)
        .set({ 
          present, 
          workoutRoutineId: workoutRoutineId || null,
          description: description || "",
          updatedAt: new Date() 
        })
        .where(eq(attendance.id, existingAttendance[0].id))
        .returning();

      return NextResponse.json({ attendance: updatedAttendance }, { status: 200 });
    } else {
      // Criar novo registro
      const [newAttendance] = await db
        .insert(attendance)
        .values({
          userId: userIdToUse,
          date: new Date(date),
          present,
          workoutRoutineId: workoutRoutineId || null,
          description: description || ""
        })
        .returning();

      return NextResponse.json({ attendance: newAttendance }, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating/updating attendance:", error);
    return NextResponse.json({ error: "Erro ao criar/atualizar presença" }, { status: 500 });
  }
}

// DELETE - Remover presença
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

    const { date, userId: targetUserId } = await request.json();
    
    if (!date) {
      return NextResponse.json({ error: "Data é obrigatória" }, { status: 400 });
    }

    // Determinar para qual usuário deletar a presença
    let userIdToDelete = decoded.id;
    
    if (targetUserId && targetUserId !== decoded.id) {
      // Verificar se é admin
      const [currentUser] = await db.select().from(users).where(eq(users.id, decoded.id));
      if (!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
      }
      userIdToDelete = targetUserId;
    }

    // Deletar registro para a data específica
    await db
      .delete(attendance)
      .where(
        and(
          eq(attendance.userId, userIdToDelete),
          eq(attendance.date, new Date(date))
        )
      );

    return NextResponse.json({ message: "Presença removida com sucesso" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting attendance:", error);
    return NextResponse.json({ error: "Erro ao remover presença" }, { status: 500 });
  }
}
