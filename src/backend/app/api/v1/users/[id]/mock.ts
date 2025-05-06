export const mockUserUpdate = (id: string) => ({
  id,
  name: "Usuário Atualizado",
  email: `atualizado${id}@gymtrack.com`,
  role: "cliente",
  message: "Usuário atualizado"
});
