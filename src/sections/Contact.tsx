import { useRef, useState, useCallback, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { CONTACT_INTRO, EMAILJS_CONFIG } from '../data/portfolio';
import { EASE_SMOOTH, VIEWPORT, fadeUpVariant } from '../lib/animation';
import SectionHeader from '../components/ui/SectionHeader';

// ── Constants ─────────────────────────────────────────────────────────────────
const FIELD = {
  NAME:    'user_name',
  EMAIL:   'user_email',
  MESSAGE: 'message',
} as const;

const RATE_LIMIT_KEY      = 'contact_last_sent';
const RATE_LIMIT_SECONDS  = 60;
const SUCCESS_DISPLAY_MS  = 4000;

type SendStatus   = 'idle' | 'sending' | 'success' | 'error';
type FieldErrors  = Partial<Record<keyof typeof FIELD, string>>;

// ── Animation config ──────────────────────────────────────────────────────────
const variants = {
  successCard: {
    hidden:  { opacity: 0, scale: 0.95, y: 16 },
    visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.5, ease: EASE_SMOOTH } },
    exit:    { opacity: 0, scale: 0.95, y: -16, transition: { duration: 0.3 } },
  } satisfies Variants,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const getRemainingCooldown = (): number => {
  const last = localStorage.getItem(RATE_LIMIT_KEY);
  if (!last) return 0;
  const elapsed = Math.floor((Date.now() - Number(last)) / 1000);
  return Math.max(0, RATE_LIMIT_SECONDS - elapsed);
};

// ── Component ─────────────────────────────────────────────────────────────────
const Contact = () => {
  const shouldReduce = useReducedMotion();
  const initial      = shouldReduce ? 'visible' : 'hidden';

  const formRef                 = useRef<HTMLFormElement>(null);
  const [status, setStatus]     = useState<SendStatus>('idle');
  const [errors, setErrors]     = useState<FieldErrors>({});
  const [cooldown, setCooldown] = useState<number>(() => getRemainingCooldown());

  const validate = (): FieldErrors => {
    const form = formRef.current;
    if (!form) return {};
    const name    = (form.elements.namedItem(FIELD.NAME)    as HTMLInputElement)?.value.trim();
    const email   = (form.elements.namedItem(FIELD.EMAIL)   as HTMLInputElement)?.value.trim();
    const message = (form.elements.namedItem(FIELD.MESSAGE) as HTMLTextAreaElement)?.value.trim();
    const errs: FieldErrors = {};
    if (!name)    errs.NAME    = 'Name is required.';
    if (!email)   errs.EMAIL   = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.EMAIL = 'Please enter a valid email address.';
    if (!message) errs.MESSAGE = 'Message is required.';
    return errs;
  };

  // Auto-return to form after success
  useEffect(() => {
    if (status !== 'success') return;
    const id = setTimeout(() => setStatus('idle'), SUCCESS_DISPLAY_MS);
    return () => clearTimeout(id);
  }, [status]);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) { clearInterval(id); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending' || cooldown > 0) return;

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    setStatus('sending');
    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current!,
        { publicKey: EMAILJS_CONFIG.publicKey },
      );
      localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
      setCooldown(RATE_LIMIT_SECONDS);
      setStatus('success');
      formRef.current?.reset();
    } catch {
      setStatus('error');
    }
  }, [status, cooldown]);

  const isBlocked = status === 'sending' || cooldown > 0;
  const btnLabel  = status === 'sending'
    ? 'Sending…'
    : cooldown > 0
      ? `Wait ${cooldown}s`
      : 'Send Message';

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-28 px-6">

      {/* ── Section header ── */}
      <SectionHeader
        id="contact-heading"
        label={CONTACT_INTRO.sectionTitle}
        heading={CONTACT_INTRO.sectionHeading}
        subtext={CONTACT_INTRO.sectionSubtext}
        initial={initial}
      />

      {/* ── Form (ortalanmış, max-w-xl) ── */}
      <div className="max-w-6xl mx-auto flex justify-center">

        {/* ── İletişim formu / success card ── */}
        <motion.div
          variants={fadeUpVariant}
          initial={initial}
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative w-full max-w-xl"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (

              /* ── Success card ── */
              <motion.div
                key="success"
                variants={variants.successCard}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center justify-center text-center gap-5 p-10 rounded-2xl border border-muted-foreground/30 bg-muted/20 shadow-sm min-h-105"
              >
                <span
                  className="flex items-center justify-center w-16 h-16 rounded-full"
                  style={{ background: 'rgb(from var(--status-production) r g b / 0.12)' }}
                  aria-hidden="true"
                >
                  <FaCheckCircle
                    className="text-3xl"
                    style={{ color: 'var(--status-production)' }}
                  />
                </span>

                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-extrabold text-foreground m-0 tracking-tight">
                    Message Sent!
                  </h3>
                  <p className="text-base leading-[1.75] text-muted-foreground m-0 max-w-[34ch]">
                    Thanks for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>

                <p className="text-xs text-muted-foreground/40 m-0">
                  Returning to form shortly…
                </p>
              </motion.div>

            ) : (

              /* ── Form ── */
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                variants={variants.successCard}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-4 p-7 rounded-2xl border border-muted-foreground/30 bg-muted/20 shadow-sm"
                noValidate
              >
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name={FIELD.NAME}
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    onChange={() => setErrors((prev) => ({ ...prev, NAME: undefined }))}
                    className={`w-full px-4 py-3 rounded-xl bg-muted border text-foreground text-base placeholder:text-muted-foreground/40 outline-none transition-colors duration-200 ${
                      errors.NAME
                        ? 'border-(--form-error) focus:border-(--form-error)'
                        : 'border-muted-foreground/30 focus:border-muted-foreground/60'
                    }`}
                  />
                  {errors.NAME && (
                    <p role="alert" className="text-xs m-0" style={{ color: 'var(--form-error)' }}>{errors.NAME}</p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name={FIELD.EMAIL}
                    type="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    onChange={() => setErrors((prev) => ({ ...prev, EMAIL: undefined }))}
                    className={`w-full px-4 py-3 rounded-xl bg-muted border text-foreground text-base placeholder:text-muted-foreground/40 outline-none transition-colors duration-200 ${
                      errors.EMAIL
                        ? 'border-(--form-error) focus:border-(--form-error)'
                        : 'border-muted-foreground/30 focus:border-muted-foreground/60'
                    }`}
                  />
                  {errors.EMAIL && (
                    <p role="alert" className="text-xs m-0" style={{ color: 'var(--form-error)' }}>{errors.EMAIL}</p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name={FIELD.MESSAGE}
                    rows={5}
                    placeholder="Tell me about your project..."
                    onChange={() => setErrors((prev) => ({ ...prev, MESSAGE: undefined }))}
                    className={`w-full px-4 py-3 rounded-xl bg-muted border text-foreground text-base placeholder:text-muted-foreground/40 outline-none transition-colors duration-200 resize-none ${
                      errors.MESSAGE
                        ? 'border-(--form-error) focus:border-(--form-error)'
                        : 'border-muted-foreground/30 focus:border-muted-foreground/60'
                    }`}
                  />
                  {errors.MESSAGE && (
                    <p role="alert" className="text-xs m-0" style={{ color: 'var(--form-error)' }}>{errors.MESSAGE}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isBlocked}
                  className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-fg)' }}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      {btnLabel}
                    </>
                  ) : cooldown > 0 ? (
                    btnLabel
                  ) : (
                    <>
                      <FaPaperPlane aria-hidden="true" />
                      {btnLabel}
                    </>
                  )}
                </button>

                {/* Hata mesajı */}
                {status === 'error' && (
                  <p role="alert" className="text-center text-sm m-0" style={{ color: 'var(--status-development)' }}>
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </motion.form>

            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;

