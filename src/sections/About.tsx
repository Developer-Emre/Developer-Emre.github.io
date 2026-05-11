import { FaLinkedin, FaGithub, FaDownload } from 'react-icons/fa';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { PERSONAL, ABOUT_SKILLS, ABOUT_DESCRIPTION, RESUME_URL } from '../data/portfolio';
import SkillBadge from '../components/ui/SkillBadge';
import { EASE_SMOOTH } from '../lib/animation';
import { trackEvent, GA_EVENTS } from '../lib/analytics';

// ── Animation config ───────────────────────────────────────────────

const variants = {
  content: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  } satisfies Variants,

  stagger: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.07 } },
  } satisfies Variants,

  slideLeft: {
    hidden:  { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_SMOOTH } },
  } satisfies Variants,

  slideRight: {
    hidden:  { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_SMOOTH } },
  } satisfies Variants,

  fadeUp: {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  } satisfies Variants,
};

// ── Component ─────────────────────────────────────────────────
const About = () => {
  const shouldReduce = useReducedMotion();
  const initial = shouldReduce ? 'visible' : 'hidden';

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 md:pt-0"
    >
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center gap-12">

        {/* ── İçerik ── */}
        <motion.div
          className="w-full flex flex-col items-start text-left gap-6"
          variants={variants.content}
          initial={initial}
          animate="visible"
        >
          <motion.h1 id="about-heading" className="text-h1 font-extrabold leading-[1.1] tracking-[-0.02em] text-foreground" variants={variants.slideLeft}>
            Hi, I'm <span>{PERSONAL.name}</span>
          </motion.h1>

          <motion.p className="text-[clamp(1rem,1.8vw,1.25rem)] font-normal text-muted-foreground m-0" variants={variants.slideLeft}>
            {PERSONAL.role}
          </motion.p>

          <motion.p className="max-w-[64ch] text-body-md leading-[1.75] text-muted-foreground m-0" variants={variants.slideLeft}>
            {ABOUT_DESCRIPTION}
          </motion.p>

          {/* Skill badge'leri */}
          <motion.div
            className="flex flex-wrap justify-start gap-2"
            variants={variants.stagger}
          >
            {ABOUT_SKILLS.map((skill) => (
              <motion.span key={skill.name} variants={variants.fadeUp}>
                <SkillBadge name={skill.name} icon={skill.icon} color={skill.color} />
              </motion.span>
            ))}
          </motion.div>

          {/* CTA butonları */}
          <motion.div
            className="flex flex-wrap justify-start gap-3 mt-2"
            variants={variants.stagger}
          >
            <motion.a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-outline hero-btn-linkedin"
              variants={variants.fadeUp}
              onClick={() => trackEvent(GA_EVENTS.LINKEDIN_CLICK)}
            >
              <FaLinkedin aria-hidden="true" />
              LinkedIn
            </motion.a>
            <motion.a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-outline hero-btn-github"
              variants={variants.fadeUp}
              onClick={() => trackEvent(GA_EVENTS.GITHUB_CLICK)}
            >
              <FaGithub aria-hidden="true" />
              GitHub
            </motion.a>
            <motion.a
              href={RESUME_URL}
              download
              className="hero-btn-primary"
              variants={variants.fadeUp}
              onClick={() => trackEvent(GA_EVENTS.RESUME_DOWNLOAD)}
            >
              Download Resume
              <FaDownload aria-hidden="true" />
            </motion.a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
