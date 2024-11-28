import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mockUsers } from "./mock-data";
import type { User, UserRole } from "./types";

const sessionSecret = process.env.SESSION_SECRET || "default-secret-key";

const storage = createCookieSessionStorage({
  cookie: {
    name: "BLI_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = mockUsers.find(u => u.id === userId);
    return user || null;
  } catch {
    throw logout(request);
  }
}

export async function requireUser(
  request: Request,
  roles?: UserRole[]
) {
  const userId = await requireUserId(request);
  const user = await getUser(request);

  if (!user) {
    throw logout(request);
  }

  if (roles && !roles.includes(user.role)) {
    throw redirect("/unauthorized");
  }

  return user;
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function verifyLogin(email: string, password: string) {
  const user = mockUsers.find(u => u.email === email);
  if (!user) return null;

  // In a real app, you would verify the password hash
  // For demo purposes, we'll accept any password
  return user;
}