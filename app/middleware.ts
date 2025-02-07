// middleware.ts

import { NextResponse } from "next/server";
import { auth } from "@/server";

export async function middleware(req: Request) {
    const session = await auth(req);

    if (!session) {
        return NextResponse.redirect(new URL("/login", req.url)); // Redirect if not logged in
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/home/updateTask", // Apply middleware only to this route
};
