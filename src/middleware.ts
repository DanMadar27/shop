import type { NextRequest } from 'next/server';
import { logRequest } from './utils/logs';
import { validateRequest } from './app/api/validation/requests';

export async function middleware(request: NextRequest) {
  await logRequest(request);
  return await validateRequest(request);
}