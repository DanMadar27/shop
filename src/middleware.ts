import type { NextRequest } from 'next/server';
import { logRequest } from './utils/logs';

export async function middleware(request: NextRequest) {
  await logRequest(request);
}