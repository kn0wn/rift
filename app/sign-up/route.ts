import { redirect } from 'next/navigation';
import { getSignUpUrl } from '@workos-inc/authkit-nextjs';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const returnTo = searchParams.get('return_to');

  const authorizationUrl = await getSignUpUrl({
    state: returnTo ? JSON.stringify({ returnTo }) : undefined,
  });
  
  return redirect(authorizationUrl);
}
