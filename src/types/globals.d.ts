export {};

declare global {
  interface Window {
    /** Created by the GTM snippet in app/layout.tsx. */
    dataLayer: Record<string, unknown>[];
  }
}
