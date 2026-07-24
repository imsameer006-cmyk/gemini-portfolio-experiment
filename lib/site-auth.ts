export const SITE_AUTH_COOKIE = "site-auth";
export const SITE_AUTH_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const encoder = new TextEncoder();

function toBase64Url(buffer: ArrayBuffer) {
  return Buffer.from(buffer).toString("base64url");
}

async function hmacSha256(message: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return toBase64Url(signature);
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return mismatch === 0;
}

function getConfiguredPassword() {
  const password = process.env.SITE_PASSWORD;
  return password && password.length > 0 ? password : null;
}

export async function createSiteAuthCookieValue(now = Date.now()) {
  const password = getConfiguredPassword();
  if (!password) return null;

  const payload = `v1.${now}`;
  const signature = await hmacSha256(payload, password);
  return `${payload}.${signature}`;
}

export async function isValidSiteAuthCookie(value?: string) {
  const password = getConfiguredPassword();
  if (!password || !value) return false;

  const parts = value.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return false;

  const issuedAt = Number(parts[1]);
  if (!Number.isFinite(issuedAt)) return false;

  const ageMs = Date.now() - issuedAt;
  if (ageMs < 0 || ageMs > SITE_AUTH_MAX_AGE_SECONDS * 1000) return false;

  const payload = `${parts[0]}.${parts[1]}`;
  const expectedSignature = await hmacSha256(payload, password);
  return constantTimeEqual(parts[2], expectedSignature);
}
