import { handleAuth } from '@workos-inc/authkit-nextjs';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const stateParam = searchParams.get('state');

  let returnPathname = '/router';

  if (stateParam) {
    try {
      const state = JSON.parse(stateParam);
      if (state.returnTo) {
        returnPathname = state.returnTo;
      }
    } catch (e) {
      // Ignore error, use default
    }
  }

  return handleAuth({
    returnPathname,
  })(request);
}
