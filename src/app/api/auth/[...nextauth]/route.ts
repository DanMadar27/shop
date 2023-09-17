import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'

import prisma from '../../db/client';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async signIn({ user }: { user: any }) {
      try {
        const email = user.email;

        if (!email) {
          throw new Error('No email for user');
        }
        
        const userExists = await prisma.user.findUnique({
          where: { email }
        });

        if (!userExists) {
          const newUser = await prisma.user.create({
              data: {
                email,
                ...(user.name && { name: user.name })
              }
          });

          console.log(`Created user ${email}`);
        }

        return true;
      }
      catch (error) {
        console.error(error);
        return false;
      }
    },
  }
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };