import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();
/*
  this creates the follow routes:
  /api/auth/login: The route used to login with auth0
  /api/auth/logout: The route used to log the user out.
  /api/auth/callback: The route Auth0 will redirect the user to after a successful login.
  /api/auth/me: The route to fetch the user profile from.
*/
