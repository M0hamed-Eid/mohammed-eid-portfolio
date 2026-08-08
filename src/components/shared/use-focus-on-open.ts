"use client";

import { useEffect, useRef } from "react";

const RETRY_MS = 16;
const MAX_ATTEMPTS = 12;

/**
 * Makes sure focus lands inside a dialog panel when it opens.
 *
 * Base UI keeps focus on the previously focused element when a dialog is opened
 * programmatically — from controlled `open` state rather than a `Dialog.Trigger`,
 * which is how every lightbox here works. An open dialog also marks the rest of
 * the page `inert`, so if focus stayed on the trigger it would be stranded on an
 * inert element and screen readers would never enter the dialog.
 *
 * Backs off if Base UI already moved focus inside, so the two never fight. Uses a
 * timer rather than `requestAnimationFrame` because rAF is suspended in hidden or
 * occluded tabs, which would leave focus stranded if a dialog opens there.
 *
 * Attach the returned ref to the panel and give it `tabIndex={-1}`.
 */
export function useFocusOnOpen<T extends HTMLElement>(open: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!open) return;

    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tryFocus = () => {
      const panel = ref.current;

      if (panel) {
        // Something inside already has focus — leave it alone.
        if (!panel.contains(document.activeElement)) {
          panel.focus();
        }
        return;
      }

      // The panel mounts into a portal a tick or two after `open` flips.
      if (++attempts < MAX_ATTEMPTS) {
        timer = setTimeout(tryFocus, RETRY_MS);
      }
    };

    timer = setTimeout(tryFocus, 0);
    return () => clearTimeout(timer);
  }, [open]);

  return ref;
}
