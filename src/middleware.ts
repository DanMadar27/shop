import type { NextRequest } from 'next/server';
import { validateRequest } from './app/api/validation/requests';
import { logRequest } from './utils/logs';
import { setResponseHeaders } from './utils/middlewares';

export async function middleware(request: NextRequest) {
  await logRequest(request);
  const { response, remainingRequests } = await validateRequest(request);
  return setResponseHeaders(response, remainingRequests);
}