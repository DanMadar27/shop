import { type NextRequest } from 'next/server';

export async function logRequest(request: NextRequest) {  
  const str = `-----------------------------------------\n` +
    `Incoming Request ${new Date().toISOString()}\n` +
    `${request.method} ${request.nextUrl.pathname}\n` +
    `-----------------------------------------`;
  
  console.log(str);
}