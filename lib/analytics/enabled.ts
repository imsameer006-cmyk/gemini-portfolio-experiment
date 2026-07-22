// TODO: flip NEXT_PUBLIC_ANALYTICS_ENABLED to "true" in production only after the consent banner ships.
export function isAnalyticsEnabled() {
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED?.toLowerCase() === "true";
}

export function isAnalyticsDebugEnabled() {
  return isAnalyticsEnabled() && process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";
}
