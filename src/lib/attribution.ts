/**
 * Client-side visitor attribution.
 *
 * Answers "where did this lead come from?" without any third-party tracker.
 * Two horizons are kept:
 *
 *  - FIRST touch  — the very first campaign/referrer that ever brought this
 *                   browser to the site. Written once, then never overwritten,
 *                   so a lead who arrives via an ad and converts days later on
 *                   a direct visit still credits the ad.
 *  - LAST touch   — the campaign/referrer for the current visit. Overwritten
 *                   whenever a fresh visit carries campaign params.
 *
 * Both live in localStorage (survives tab close); a sessionStorage marker
 * keeps a same-session reload from counting as a new visit.
 */

const FIRST_TOUCH_KEY = "hh_attr_first";
const LAST_TOUCH_KEY = "hh_attr_last";
const VISITS_KEY = "hh_attr_visits";
const SESSION_KEY = "hh_attr_session";

/** Campaign params worth capturing. */
const UTM_PARAMS = ["source", "medium", "campaign", "term", "content"] as const;

/** Ad-platform click IDs, in the order we prefer them when more than one is present. */
const CLICK_ID_PARAMS = ["gclid", "fbclid", "msclkid", "ttclid", "li_fat_id"] as const;

export interface TouchData {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  clickId: string;
  clickIdType: string;
  referrer: string;
  landingPage: string;
  timestamp: string;
}

export interface AttributionData {
  /** Human-readable bucket derived from the last touch — "Google Ads", "Direct", etc. */
  channel: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  clickId: string;
  clickIdType: string;
  referrer: string;
  landingPage: string;
  firstTouchChannel: string;
  firstTouchSource: string;
  firstTouchCampaign: string;
  firstTouchReferrer: string;
  firstTouchLandingPage: string;
  firstTouchAt: string;
  visitCount: string;
  submittedPage: string;
  deviceType: string;
  screenSize: string;
  language: string;
  timezone: string;
}

const EMPTY_TOUCH: TouchData = {
  source: "",
  medium: "",
  campaign: "",
  term: "",
  content: "",
  clickId: "",
  clickIdType: "",
  referrer: "",
  landingPage: "",
  timestamp: "",
};

const EMPTY_ATTRIBUTION: AttributionData = {
  channel: "",
  source: "",
  medium: "",
  campaign: "",
  term: "",
  content: "",
  clickId: "",
  clickIdType: "",
  referrer: "",
  landingPage: "",
  firstTouchChannel: "",
  firstTouchSource: "",
  firstTouchCampaign: "",
  firstTouchReferrer: "",
  firstTouchLandingPage: "",
  firstTouchAt: "",
  visitCount: "",
  submittedPage: "",
  deviceType: "",
  screenSize: "",
  language: "",
  timezone: "",
};

/** localStorage throws in Safari private mode and wherever site data is blocked. */
function safeRead(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeWrite(storage: Storage, key: string, value: string): void {
  try {
    storage.setItem(key, value);
  } catch {
    /* Storage unavailable — attribution degrades to live-URL-only, never breaks the form. */
  }
}

function readTouch(key: string): TouchData | null {
  const raw = safeRead(window.localStorage, key);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<TouchData>;
    return { ...EMPTY_TOUCH, ...parsed };
  } catch {
    return null;
  }
}

/** Reads the current URL's campaign params into a touch record. */
function readTouchFromUrl(): TouchData {
  const params = new URLSearchParams(window.location.search);
  const touch: TouchData = { ...EMPTY_TOUCH };

  for (const key of UTM_PARAMS) {
    touch[key] = (params.get(`utm_${key}`) ?? "").trim().slice(0, 200);
  }

  for (const param of CLICK_ID_PARAMS) {
    const value = params.get(param);
    if (value) {
      touch.clickId = value.trim().slice(0, 200);
      touch.clickIdType = param;
      break;
    }
  }

  touch.referrer = document.referrer.slice(0, 500);
  touch.landingPage = (
    window.location.origin +
    window.location.pathname +
    window.location.search
  ).slice(0, 500);
  touch.timestamp = new Date().toISOString();

  return touch;
}

/** True when the visit carries any signal beyond "someone opened the site". */
function hasCampaignSignal(touch: TouchData): boolean {
  return Boolean(touch.source || touch.medium || touch.campaign || touch.clickId);
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

const SEARCH_ENGINES = ["google.", "bing.", "duckduckgo.", "yahoo.", "ecosia.", "baidu.", "yandex."];
const SOCIAL_NETWORKS = [
  "facebook.",
  "instagram.",
  "linkedin.",
  "twitter.",
  "x.com",
  "t.co",
  "youtube.",
  "pinterest.",
  "reddit.",
  "whatsapp.",
  "threads.",
];

const PAID_MEDIUMS = ["cpc", "ppc", "paid", "paidsearch", "paid_social", "paidsocial", "display", "cpm"];

/**
 * Collapses the raw params into one bucket a sales team can filter on.
 * Paid click IDs win over utm params, which win over referrer sniffing.
 */
export function deriveChannel(touch: TouchData): string {
  const source = touch.source.toLowerCase();
  const medium = touch.medium.toLowerCase();

  if (touch.clickIdType === "gclid") return "Google Ads";
  if (touch.clickIdType === "fbclid") return "Meta Ads";
  if (touch.clickIdType === "msclkid") return "Microsoft Ads";
  if (touch.clickIdType === "ttclid") return "TikTok Ads";
  if (touch.clickIdType === "li_fat_id") return "LinkedIn Ads";

  if (PAID_MEDIUMS.includes(medium)) {
    if (source.includes("google")) return "Google Ads";
    if (source.includes("facebook") || source.includes("meta") || source.includes("instagram")) {
      return "Meta Ads";
    }
    if (source.includes("linkedin")) return "LinkedIn Ads";
    return source ? `Paid — ${touch.source}` : "Paid";
  }

  if (medium === "email" || source.includes("mailchimp") || source.includes("sendgrid")) return "Email";
  if (medium === "whatsapp" || source.includes("whatsapp")) return "WhatsApp";
  if (medium === "social" || medium === "organic_social") {
    return source ? `Social — ${touch.source}` : "Social";
  }
  if (touch.source) return `${touch.source}${touch.medium ? ` / ${touch.medium}` : ""}`;

  const referrerHost = hostOf(touch.referrer);
  if (!referrerHost || referrerHost === hostOf(window.location.href)) return "Direct";
  if (SEARCH_ENGINES.some((engine) => referrerHost.includes(engine))) return "Organic Search";
  if (SOCIAL_NETWORKS.some((network) => referrerHost.includes(network))) {
    return `Organic Social — ${referrerHost}`;
  }
  return `Referral — ${referrerHost}`;
}

function deviceType(): string {
  const ua = navigator.userAgent;
  if (/iPad|Android(?!.*Mobile)|Tablet/i.test(ua)) return "Tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "Mobile";
  return "Desktop";
}

/**
 * Records this page view's attribution. Safe to call on every mount — the
 * first touch is only ever written once, and the visit counter only advances
 * when a new browser session starts.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  const current = readTouchFromUrl();

  if (!readTouch(FIRST_TOUCH_KEY)) {
    safeWrite(window.localStorage, FIRST_TOUCH_KEY, JSON.stringify(current));
  }

  // Only overwrite the last touch when this visit actually carries campaign
  // data — otherwise an internal navigation would wipe the ad that brought
  // them in and relabel the lead as Direct.
  if (hasCampaignSignal(current) || !readTouch(LAST_TOUCH_KEY)) {
    safeWrite(window.localStorage, LAST_TOUCH_KEY, JSON.stringify(current));
  }

  if (!safeRead(window.sessionStorage, SESSION_KEY)) {
    safeWrite(window.sessionStorage, SESSION_KEY, "1");
    const previous = Number.parseInt(safeRead(window.localStorage, VISITS_KEY) ?? "0", 10);
    safeWrite(window.localStorage, VISITS_KEY, String((Number.isNaN(previous) ? 0 : previous) + 1));
  }
}

/** Builds the attribution block sent alongside the form fields. */
export function getAttribution(): AttributionData {
  if (typeof window === "undefined") return { ...EMPTY_ATTRIBUTION };

  const live = readTouchFromUrl();
  const last = readTouch(LAST_TOUCH_KEY) ?? live;
  const first = readTouch(FIRST_TOUCH_KEY) ?? last;

  let timezone = "";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  } catch {
    /* Not every engine exposes a resolved timezone. */
  }

  return {
    channel: deriveChannel(last),
    source: last.source,
    medium: last.medium,
    campaign: last.campaign,
    term: last.term,
    content: last.content,
    clickId: last.clickId,
    clickIdType: last.clickIdType,
    referrer: last.referrer,
    landingPage: last.landingPage,
    firstTouchChannel: deriveChannel(first),
    firstTouchSource: first.source,
    firstTouchCampaign: first.campaign,
    firstTouchReferrer: first.referrer,
    firstTouchLandingPage: first.landingPage,
    firstTouchAt: first.timestamp,
    visitCount: safeRead(window.localStorage, VISITS_KEY) ?? "1",
    submittedPage: (window.location.origin + window.location.pathname).slice(0, 500),
    deviceType: deviceType(),
    screenSize: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language ?? "",
    timezone,
  };
}
