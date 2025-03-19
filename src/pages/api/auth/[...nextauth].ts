import NextAuth, { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

import { getAuth0Roles } from '@/lib/auth0';

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID ?? '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
      issuer: process.env.AUTH0_ISSUER_BASE_URL ?? '',
      idToken: true,
      authorization: {
        params: {
          audience: encodeURI(process.env.AUTH0_AUDIENCE ?? '')
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    session: async ({ session, token }: any) => {
      if (token) {
        session.user.role = token.role;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }

      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        const role = await getAuth0Roles(token.sub);
        token.accessToken = account.access_token;
        token.role = role;
      }

      return token;
    }
  },
  secret: process.env.AUTH_SECRET
};

export default NextAuth(authOptions);
