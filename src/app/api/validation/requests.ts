import { NextResponse, type NextRequest } from 'next/server';
import rateLimiter from '@/utils/rateLimit';
import { validateSearch } from '@/utils/validation';

async function getParams(request: NextRequest) {
  switch (request.method) {
    case 'GET':
      return new URL(request.url).searchParams.toString();
    case 'POST':
    case 'PUT':
    case 'PATCH':
      return await request.json();
    default:
      return null;
  }
}

async function isMaliciousRequest(request: NextRequest) {
  const params = JSON.stringify(await getParams(request));
  const sqlInjectionPattern = /SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR\s+1\s*=\s*1/i;

  return sqlInjectionPattern.test(params);
}

export async function validateRequest(request: NextRequest) {
  let response;

  const remainingRequests = rateLimiter.remainingRequests(request);

  if (!remainingRequests) {
    console.error('Rate limit exceeded');
    response = NextResponse.json(
      { error: 'Rate limit exceeded' }, { status: 429 }
    );

    return { response, remainingRequests}
  }

  if (await isMaliciousRequest(request)) {
    console.error('Malicious request');
    response = NextResponse.json(
      { error: 'Bad request' }, { status: 400 }
    );

    return { response, remainingRequests}
  }

  response = NextResponse.next();
  return { response, remainingRequests}
}

export function validateSlug(slug: string) {
  return !isNaN(parseInt(slug));
}

export function validateGetManyRequest(skip: string, take: string, search = '') {
  if (isNaN(parseInt(skip)) || isNaN(parseInt(take))) {
    return false;
  }

  if (search && !validateSearch(search)) {
    return false;
  }
  
  return true;
}
