import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { EXPERIENCE_INTRO, EXPERIENCE_HIGHLIGHTS, EXPERIENCES } from '../data/portfolio';
import { EASE_SMOOTH, VIEWPORT, fadeUpVariant, staggerVariant } from '../lib/animation';
import SectionHeader from '../components/ui/SectionHeader';
import { analytics } from '../lib/analytics';

// ── Animation config ──────────────────────────────────────────────────────────
const variants = {
  fadeLeft: {
    hidden:  { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_SMOOTH } },
  } satisfies Variants,

  highlight: {
    hidden:  { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  } satisfies Variants,
};

// ── Component ─────────────────────────────────────────────────────────────────
const Experience = () => {
  const shouldReduce = useReducedMotion();
  const initial = shouldReduce ? 'visible' : 'hidden';

  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-28 px-6">

      {/* ── Section header ── */}
      <SectionHeader
        id="experience-heading"
        label={EXPERIENCE_INTRO.sectionTitle}
        heading={EXPERIENCE_INTRO.sectionHeading}
        subtext={EXPERIENCE_INTRO.sectionSubtext}
        initial={initial}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20 md:items-start">

        {/* ── Sol: Intro ── */}
        <motion.div
          className="flex flex-col gap-6 md:sticky top-24"
          variants={staggerVariant}
          initial={initial}
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <motion.span className="text-xs font-bold tracking-[0.14em] uppercase text-(--accent-exp-subtle)" variants={fadeUpVariant}>
            {EXPERIENCE_INTRO.label}
          </motion.span>

          <motion.h3 className="text-h3 font-extrabold leading-[1.15] tracking-[-0.02em] text-foreground m-0" variants={fadeUpVariant}>
            {EXPERIENCE_INTRO.heading}
          </motion.h3>

          <motion.p className="text-body-md leading-[1.75] text-muted-foreground max-w-[48ch] m-0" variants={fadeUpVariant}>
            {EXPERIENCE_INTRO.description}
          </motion.p>

          {/* Highlight listesi */}
          <motion.ul className="list-none p-0 mt-2 flex flex-col gap-3.5" variants={staggerVariant}>
            {EXPERIENCE_HIGHLIGHTS.map((item) => (
              <motion.li key={item} className="flex items-center gap-3 text-base font-semibold text-foreground" variants={variants.highlight}>
                <FaCheckCircle className="text-(--accent-exp) shrink-0 text-xl" aria-hidden="true" />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ── Sağ: Timeline ── */}
        <div className="relative">
          {/* Dikey çizgi */}
          <div className="absolute left-0 top-[0.45rem] bottom-0 w-0.5 bg-muted-foreground/40" aria-hidden="true" />

          <motion.ol
            className="list-none p-0 m-0 flex flex-col gap-12"
            variants={staggerVariant}
            initial={initial}
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {EXPERIENCES.map((exp, index) => (
              <motion.li key={exp.id} className="relative pl-8" variants={variants.fadeLeft} onClick={() => analytics.experienceView(exp.company, exp.role)}>
                {/* Nokta */}
                <div
                  className={`absolute left-[-0.3rem] top-[0.45rem] w-[0.7rem] h-[0.7rem] rounded-full border-2 border-background transition-colors ${
                    index === 0 ? 'bg-foreground' : 'bg-muted-foreground'
                  }`}
                  style={index === 0 ? { boxShadow: '0 0 8px 2px var(--accent-exp-dot-glow)' } : undefined}
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold tracking-[0.08em] uppercase text-(--accent-exp-subtle)">{exp.period}</span>
                  <h3 className="text-lg font-bold text-foreground m-0">
                    {exp.role}
                    <span className="font-medium text-muted-foreground"> @ {exp.company}</span>
                  </h3>
                  <p className="text-base leading-[1.75] text-muted-foreground mt-1 mb-0">{exp.description}</p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-foreground border border-border">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>

      </div>
    </section>
  );
};

export default Experience;
