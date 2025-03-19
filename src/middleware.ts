import { type NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware (req: NextRequestWithAuth) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    const adminRoutes = ['/finance/:path', '/users', '/users/:path', '/reports'];

    const isAdminRoute = adminRoutes.some((route) => {
      const regex = new RegExp(`^${ route.replace(':path', '.*') }$`);
      return regex.test(pathname);
    });

    if (isAdminRoute && token?.role !== 'admin') {
      console.log(token?.role, 'only admins :p');
      return NextResponse.redirect(new URL('/home', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) return false;

        return true;
      }
    },
    pages: {
      signIn: '/'
    }
  }
);

export const config = { matcher: ['/home', '/finance', '/finance/:path', '/users', '/users/:path', '/reports'] };
