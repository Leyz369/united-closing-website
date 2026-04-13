declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

type AnalyticsEvent =
  | 'click_primary_cta'
  | 'form_submit_success'
  | 'outbound_whatsapp_click';

interface EventProperties {
  location?: string;
  label?: string;
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(event: AnalyticsEvent, properties?: EventProperties): void {
  if (typeof window === 'undefined') return;

  try {
    if (window.plausible) {
      window.plausible(event, properties ? { props: properties } : undefined);
    }

    if (import.meta.env.DEV) {
      console.log('[Analytics Event]', event, properties || {});
    }
  } catch (error) {
    console.error('[Analytics] Failed to track event:', error);
  }
}

export function trackCTAClick(location: string, label: string): void {
  trackEvent('click_primary_cta', {
    location,
    label,
  });
}

export function trackFormSubmitSuccess(formType: string): void {
  trackEvent('form_submit_success', {
    form_type: formType,
  });
}

export function trackWhatsAppClick(location: string): void {
  trackEvent('outbound_whatsapp_click', {
    location,
  });
}
