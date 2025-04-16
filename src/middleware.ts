import { NextResponse } from "next/server";

export function middleware(request: { nextUrl: { pathname: string; }; }) {
  const response = NextResponse.next();

  // Set cache headers for video files
  if (request.nextUrl.pathname.match(/\.(webm|mp4|gif)$/)) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
  }

  return response;
}

export const config = {
  matcher: ["/videos/:path*"],
};
