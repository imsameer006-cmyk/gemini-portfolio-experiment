import { after, NextResponse, type NextRequest } from "next/server";
import {
  createSiteAuthCookieValue,
  SITE_AUTH_COOKIE,
} from "@/lib/site-auth";

function getSafeRedirectPath(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  return value;
}

function redirectToEnter(request: NextRequest, nextPath: string, error: "config" | "invalid") {
  const url = new URL("/enter", request.url);
  url.searchParams.set("next", nextPath);
  url.searchParams.set("error", error);
  return NextResponse.redirect(url, { status: 303 });
}

function isTransitionRequest(request: NextRequest) {
  return request.headers.get("x-site-transition") === "1";
}

function jsonError(error: "config" | "invalid", status: number) {
  return NextResponse.json({ ok: false as const, error }, { status });
}

function formatNotificationTimestamp(date: Date) {
  return date.toISOString();
}

function logNotificationError(error: unknown) {
  console.error("[ntfy] Failed to send password gate notification", error);
}

async function sendNtfyNotification({
  message,
  title,
  tags,
}: {
  message: string;
  title: string;
  tags: string;
}) {
  const topic = process.env.NTFY_TOPIC;

  if (!topic) {
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5_000);

  try {
    const response = await fetch(`https://ntfy.sh/${topic}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Title": title,
        "X-Tags": tags,
      },
      body: message,
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      logNotificationError(
        new Error(`ntfy.sh responded with ${response.status} ${response.statusText}`),
      );
    }
  } catch (error) {
    logNotificationError(error);
  } finally {
    clearTimeout(timeoutId);
  }
}

function scheduleNtfyNotification(payload: {
  message: string;
  title: string;
  tags: string;
}) {
  after(async () => {
    await sendNtfyNotification(payload);
  });
}

function notifySuccessfulPasswordEntry() {
  scheduleNtfyNotification({
    title: "Portfolio unlocked",
    tags: "unlock",
    message: `Password entered successfully\n${formatNotificationTimestamp(new Date())}`,
  });
}

function notifyFailedPasswordAttempt() {
  scheduleNtfyNotification({
    title: "Failed attempt",
    tags: "warning,no_entry",
    message: `Failed password attempt\n${formatNotificationTimestamp(new Date())}`,
  });
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return mismatch === 0;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const submittedPassword = formData.get("password");
  const nextPath = getSafeRedirectPath(formData.get("next"));
  const configuredPassword = process.env.SITE_PASSWORD;
  const transitionRequest = isTransitionRequest(request);

  if (!configuredPassword) {
    return transitionRequest ? jsonError("config", 503) : redirectToEnter(request, nextPath, "config");
  }

  if (typeof submittedPassword !== "string" || !constantTimeEqual(submittedPassword, configuredPassword)) {
    notifyFailedPasswordAttempt();
    return transitionRequest ? jsonError("invalid", 401) : redirectToEnter(request, nextPath, "invalid");
  }

  const cookieValue = await createSiteAuthCookieValue();

  if (!cookieValue) {
    return transitionRequest ? jsonError("config", 503) : redirectToEnter(request, nextPath, "config");
  }

  const response = transitionRequest
    ? NextResponse.json({ ok: true as const, redirectTo: nextPath })
    : NextResponse.redirect(new URL(nextPath, request.url), { status: 303 });

  response.cookies.set({
    name: SITE_AUTH_COOKIE,
    value: cookieValue,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  notifySuccessfulPasswordEntry();

  return response;
}

export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/enter", request.url), { status: 303 });
}
