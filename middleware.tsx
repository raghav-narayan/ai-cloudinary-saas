import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in',
  '/sign-up',
  '/',
  '/home',
]);

const isPublicAPIRoute = createRouteMatcher(['/api/videos']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth(); // Await the auth() call to resolve the promise
  const currentUrl = new URL(req.url);
  const isAccessingDashboard = currentUrl.pathname === '/home';
  const isAPIRequest = currentUrl.pathname.startsWith('/api');

  // If the user is logged in and trying to access a public route but not the dashboard
  if (userId && isPublicRoute(req) && !isAccessingDashboard) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  // If the user is not logged in
  if (!userId) {
    // If the user is trying to access a protected route
    if (!isPublicRoute(req) && !isPublicAPIRoute(req)) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // If the user is trying to access a protected API
    if (isAPIRequest && !isPublicAPIRoute(req)) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
