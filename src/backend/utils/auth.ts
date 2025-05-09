import { jwtVerify, SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "secret");

/**
 * Converte uma string hexadecimal em um array de bytes.
 * @param hex String hexadecimal.
 * @returns Uint8Array correspondente.
 */
function hexToBytes(hex: string) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

/**
 * Converte um array de bytes em uma string hexadecimal.
 * @param bytes Array de bytes.
 * @returns String hexadecimal correspondente.
 */
function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Gera um hash seguro para a senha utilizando PBKDF2.
 * @param password Senha em texto puro.
 * @param salt (Opcional) Salt em hexadecimal. Se não fornecido, será gerado automaticamente.
 * @returns Promise com string no formato 'salt:hash'.
 */
export async function hashPassword(password: string, salt?: string) {
  if (!salt) {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    salt = bytesToHex(arr);
  }
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: hexToBytes(salt),
      iterations: 100000,
      hash: "SHA-512"
    },
    key,
    64 * 8
  );
  const hash = bytesToHex(new Uint8Array(derivedBits));
  return `${salt}:${hash}`;
}

/**
 * Verifica se a senha informada corresponde ao hash armazenado.
 * @param password Senha em texto puro.
 * @param hashWithSalt String no formato 'salt:hash'.
 * @returns Promise<boolean> indicando se a senha é válida.
 */
export async function verifyPassword(password: string, hashWithSalt: string) {
  const [salt, hash] = hashWithSalt.split(":");
  const hashVerify = (await hashPassword(password, salt)).split(":")[1];
  return hash === hashVerify;
}

/**
 * Gera um token JWT para o usuário informado.
 * @param user Objeto do usuário (deve conter id, email e role).
 * @returns Promise<string> com o token JWT.
 */
export async function generateToken(user: any) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
  };
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(payload.exp)
    .sign(JWT_SECRET);
}

export interface JwtUserPayload {
  id: string;
  email: string;
  role: string;
  exp: number;
}

/**
 * Verifica e decodifica um token JWT.
 * @param token Token JWT a ser verificado.
 * @returns Promise<JwtPayload> com o payload do token se válido.
 * @throws Error se o token for inválido ou expirado.
 */
export async function verifyToken(token: string): Promise<JwtUserPayload> {
  try {
    const { payload } = await jwtVerify<JwtUserPayload>(token, JWT_SECRET);
    if (payload.exp && Date.now() / 1000 > payload.exp) throw new Error("Token expirado");
    // Garantir que o payload tem o formato correto
    const typedPayload: JwtUserPayload = {
      id: payload.id as string,
      email: payload.email as string,
      role: payload.role as string,
      exp: payload.exp as number,
    };
    return typedPayload;
  } catch (e) {
    throw new Error("Token inválido");
  }
}