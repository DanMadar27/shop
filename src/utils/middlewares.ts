import { NextResponse, type NextRequest } from 'next/server';
import { requestLimit } from '@/utils/rateLimit';

export function setResponseHeaders(response: NextResponse, remainingRequests: number) {
  response.headers.set('x-ratelimit-limit', requestLimit.toString());
  response.headers.set('x-ratelimit-remaining', remainingRequests.toString());
  return response;
}
