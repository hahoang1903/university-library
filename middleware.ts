import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "@/auth";
import { PUBLIC_PAGES } from "./constants";

const publicPages = [...Object.values(PUBLIC_PAGES)];

const intlMiddleware = createMiddleware(routing);

const authMiddleware = auth((req) => {
  if (!req.auth) {
    const signInUrl = req.nextUrl.clone();
    signInUrl.pathname = PUBLIC_PAGES.signIn;
    return NextResponse.redirect(signInUrl);
  }

  return intlMiddleware(req);
});

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (publicPages.length && isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
