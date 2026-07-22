import { isAnalyticsDebugEnabled, isAnalyticsEnabled } from "@/lib/analytics/enabled";

export type AnalyticsEventMap = {
  section_dwell: {
    section_id: string;
    dwell_seconds: number;
    page_path: string;
  };
  moment_dwell: {
    moment_id: string;
    dwell_seconds: number;
    page_path: string;
  };
  scroll_depth: {
    depth_percent: 25 | 50 | 75 | 90 | 100;
    page_path: string;
  };
  nav_click: {
    target_id: string;
    label_text: string;
    page_path: string;
  };
  resume_download: {
    page_path: string;
  };
  external_link_click: {
    destination_url: string;
    link_context: string;
    page_path: string;
  };
  view_case_study: {
    case_study_name: string;
    page_path: string;
  };
};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: keyof AnalyticsEventMap,
      params: AnalyticsEventMap[keyof AnalyticsEventMap],
    ) => void;
  }
}

export function trackEvent<EventName extends keyof AnalyticsEventMap>(
  name: EventName,
  params: AnalyticsEventMap[EventName],
) {
  if (!isAnalyticsEnabled()) return;

  if (isAnalyticsDebugEnabled()) {
    console.log("[analytics]", name, params);
  }

  window.gtag?.("event", name, params);
}
