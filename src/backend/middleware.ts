// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './utils/auth';

// Configuração para o middleware
export const config = {
  // Define em quais rotas o middleware será executado
  // Neste caso, está configurado para todas as rotas da API
  matcher: '/api/:path*',
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // Libera apenas POST para criar usuário em /api/v1/users
  if (method === 'POST' && pathname === '/api/v1/users') {
    return NextResponse.next();
  }

  // Libera apenas POST para criar usuário em /api/v1/users
  if (method === 'POST' && pathname === '/api/v1/auth/login') {
    return NextResponse.next();
  }

  // Libera o acesso ao endpoint /api/swagger.json
  if (pathname === '/api/docs/swagger') {
    return NextResponse.next();
  }

  // Obtém o token de autorização do cabeçalho
  const authHeader = request.headers.get('authorization');
  
  // Verifica se o token existe e está no formato esperado
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Se não tiver um token válido, retorna 401 Unauthorized
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Acesso não autorizado: token ausente ou inválido',
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  
  // Extrai o token removendo o prefixo "Bearer "
  const token = authHeader.substring(7);
  
  // Aqui você pode adicionar sua lógica para verificar o token
  // Por exemplo, verificar se é um JWT válido ou verificar em um banco de dados
  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    // Se houver qualquer erro na validação
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Acesso não autorizado: token inválido',
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}