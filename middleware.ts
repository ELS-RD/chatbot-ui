import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

import { MAINTENANCE_MODE } from './utils/app/const';

export default withAuth(function middleware(req) {
  if (MAINTENANCE_MODE) {
    req.nextUrl.pathname = `/maintenance`;
    return NextResponse.rewrite(req.nextUrl);
  }
  const username = req.nextauth.token?.email;
  if (username) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user', username);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
});
