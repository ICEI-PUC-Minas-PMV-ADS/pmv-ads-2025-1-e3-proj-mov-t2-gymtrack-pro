export const mockRoutines = (userId: string) => ({
  userId,
  routines: [
    { id: 1, name: "Ficha A", exercises: 8 },
    { id: 2, name: "Ficha B", exercises: 6 }
  ]
});

export const mockRoutineCreated = (userId: string) => ({
  userId,
  routineId: 3,
  message: "Ficha criada"
});
