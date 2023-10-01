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
      try {
        return await request.text() ? await request.json() : '';
      }
      catch (error) {
        console.error('Error parsing request body : ', error);
        return null;
      }
      
    default:
      return null;
  }
}

async function isMaliciousRequest(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return false;
  }

  const params = await getParams(request);

  if (params === null) {
    return true;
  }

  const sqlInjectionPattern = /SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR\s+1\s*=\s*1/i;

  return sqlInjectionPattern.test(JSON.stringify(params));
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
