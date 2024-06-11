import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData()
  const token = formData.get('credential')
  const response = await axios.post('http://server:3000/auth/login-google', {
    token
  })

  const redirect = NextResponse.redirect(
    new URL('/', request.url), { status: 302 }
  );

  redirect.cookies.set(process.env.NEXT_PUBLIC_JWT_COOKIE_NAME!, response.data.accessToken);

  return redirect;
}