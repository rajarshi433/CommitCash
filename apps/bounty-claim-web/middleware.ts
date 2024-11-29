import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export const config = {
    matcher: ["/:user/bankcreds", "/unauthorised"],
};

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        const loginUrl = new URL("/", req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}
