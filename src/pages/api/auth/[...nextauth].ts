import NextAuth, { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

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
      console.log({session});
      console.log({token});
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }

      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    }
  },
  secret: process.env.AUTH_SECRET
};

export default NextAuth(authOptions);
