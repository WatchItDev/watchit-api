import { jwtVerify, createRemoteJWKSet } from 'jose';
import type { JWTPayload } from 'jose';
import crypto from 'crypto';
import type { GQL } from '@/types';

const JWKS_URL = process.env.API_WEB3_AUTH_SOCIAL_JWKS!;
const AUD = process.env.API_WEB3AUTH_CLIENT_ID!;
const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

export interface ExtractAuthDataResult {
  payload: JWTPayload | null;
  userId: string;
  email: string;
}

export async function extractAuthData(
  ctx: GQL.ContextType,
): Promise<ExtractAuthDataResult> {
  const header = ctx.req.headers.authorization ?? '';
  const token = header.replace(/^Bearer\s+/i, '');
  const defaultRes = { payload: null, userId: '', email: '' };

  if (!token) return defaultRes;

  let payload: JWTPayload | null = null;
  try {
    const res = await jwtVerify(token, JWKS, { audience: AUD });
    payload = res.payload;
  } catch {
    payload = null;
  }

  if (!payload) return defaultRes;

  let userId = '';
  const verifierId = String(payload.verifierId || '');
  const typeOfLogin = String(payload.aggregateVerifier || '');
  if (verifierId && typeOfLogin) {
    userId = crypto
      .createHash('sha256')
      .update(`${verifierId}:${typeOfLogin}`)
      .digest('hex');
  }

  const email: string = (payload?.email ?? '') as string;

  return { payload, userId, email };
}
