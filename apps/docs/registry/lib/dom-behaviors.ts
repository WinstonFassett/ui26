// Overlay behaviors — generic DOM activate/deactivate pairs.
// Each factory returns { activate, deactivate } with no component-specific knowledge.
// Wire into effector handlers at bind time; call only the behaviors your component needs.

// ---------------------------------------------------------------------------
// Focus save/restore
// ---------------------------------------------------------------------------

export function createFocusSaver() {
  let saved: Element | null = null;

  return {
    activate() {
      saved = document.activeElement;
    },
    deactivate() {
      if (saved && document.contains(saved)) {
        (saved as HTMLElement).focus?.();
      }
      saved = null;
    },
  };
}

// ---------------------------------------------------------------------------
// Focus trap — keeps Tab/Shift-Tab inside a container element
// ---------------------------------------------------------------------------

const TABBABLE = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled])',
  'select:not([disabled])', 'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])', 'details > summary',
].join(', ');

function getTabbable(container: Element): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(TABBABLE)).filter(
    (el) => !el.closest('[inert]') && getComputedStyle(el).display !== 'none'
  );
}

export function createFocusTrap(getContainer: () => Element | null) {
  let cleanup: (() => void) | null = null;

  return {
    activate() {
      const container = getContainer();
      if (!container) return;

      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        const tabbable = getTabbable(container);
        if (!tabbable.length) { e.preventDefault(); return; }
        const first = tabbable[0];
        const last = tabbable[tabbable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };

      document.addEventListener('keydown', handleKeydown);
      cleanup = () => document.removeEventListener('keydown', handleKeydown);

      // focus first tabbable on open
      requestAnimationFrame(() => {
        const tabbable = getTabbable(container);
        (tabbable[0] ?? (container as HTMLElement)).focus?.();
      });
    },
    deactivate() {
      cleanup?.();
      cleanup = null;
    },
  };
}

// ---------------------------------------------------------------------------
// Scroll lock — body overflow, scrollbar-width compensation, iOS touch cancel
// ---------------------------------------------------------------------------

let lockCount = 0;
let savedOverflow = '';
let savedPaddingRight = '';
let cleanupTouch: (() => void) | null = null;

export function createScrollLock() {
  return {
    activate() {
      if (lockCount++ > 0) return;

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      savedOverflow = document.body.style.overflow;
      savedPaddingRight = document.body.style.paddingRight;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${parseFloat(savedPaddingRight || '0') + scrollbarWidth}px`;
      }

      // iOS: prevent touchmove on body but allow it inside scrollable children
      const onTouchMove = (e: TouchEvent) => {
        if (e.target instanceof Element && e.target.closest('[data-scroll-lock-ignore]')) return;
        e.preventDefault();
      };
      document.addEventListener('touchmove', onTouchMove, { passive: false });
      cleanupTouch = () => document.removeEventListener('touchmove', onTouchMove);
    },
    deactivate() {
      if (--lockCount > 0) return;

      document.body.style.overflow = savedOverflow;
      document.body.style.paddingRight = savedPaddingRight;
      cleanupTouch?.();
      cleanupTouch = null;
    },
  };
}

// ---------------------------------------------------------------------------
// Background hide — aria-hidden on all body children except the panel
// ---------------------------------------------------------------------------

export function createBackgroundHider(getPanel: () => Element | null) {
  let hidden: Element[] = [];

  return {
    activate() {
      const panel = getPanel();
      hidden = Array.from(document.body.children).filter((el) => {
        if (panel && (el === panel || el.contains(panel))) return false;
        if (el.getAttribute('aria-hidden') === 'true') return false;
        return true;
      });
      hidden.forEach((el) => el.setAttribute('aria-hidden', 'true'));
    },
    deactivate() {
      hidden.forEach((el) => el.removeAttribute('aria-hidden'));
      hidden = [];
    },
  };
}
