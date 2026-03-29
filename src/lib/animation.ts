import type { Variants } from 'framer-motion';

// ── Paylaşılan sabitler ───────────────────────────────────────────────────────
export const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

export const VIEWPORT = { once: true, margin: '-80px' } as const;

// ── Paylaşılan variant'lar (Experience / Projects / Skills / Contact) ─────────
export const fadeUpVariant = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_SMOOTH } },
} satisfies Variants;

export const staggerVariant = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
} satisfies Variants;

export const cardVariant = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_SMOOTH } },
} satisfies Variants;
