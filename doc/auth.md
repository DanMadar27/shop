# Authentication

This project uses NextAuth for authentication.

To add providers, modify the `src/app/api/auth/[...nextauth]/route.ts` file by adding the provider to the providers array. Additionally, add the required variables for the new providers to the `.env.example` file.

## Using Authentication In The Client-Side

To use authentication in the client-side, you can follow this example:

```typescript
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Page() {
  const { data: session } = useSession({
     required: true,
     onUnauthenticated() {
       redirect('/login?callbackUrl=/page');
     }
   });

  return (
    <div>
      Content
    </div>
  )
}
```

## Using Authentication in the Server-Side
For server components and API endpoints, you can import the following:

```typescript
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
```

Then, in server components:

```typescript
export default function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/page');
  }

  return (
    <div>
      Content
    </div>
  )
}
```

And in API endpoints:
```typescript
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || typeof session.user?.email !== 'string') {
    return NextResponse.json({ error: 'You are not logged in' }, { status: 401 });
  }

  return NextResponse.json({ message: 'You are logged in' });
}
```
