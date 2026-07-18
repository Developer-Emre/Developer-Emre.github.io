import { FaLinkedin, FaGithub, FaDownload } from 'react-icons/fa';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { PERSONAL, SKILL_CATEGORIES, ABOUT_DESCRIPTION, RESUME_URL, ABOUT_PHOTO } from '../data/portfolio';
import { analytics } from '../lib/analytics';

const SKILLS = SKILL_CATEGORIES.flatMap(cat => cat.skills);
import SkillBadge from '../components/ui/SkillBadge';

// ── Animation config ───────────────────────────────────────────────────────────
const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

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

// ── Component ─────────────────────────────────────────────────────────────────
const Hero = () => {
  const shouldReduce = useReducedMotion();

  // prefers-reduced-motion: elementler baştan final state'de başlar, animasyon oynatılmaz
  const initial = shouldReduce ? 'visible' : 'hidden';

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">

        {/* ── Sol: Metin içeriği ── */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6"
          variants={variants.content}
          initial={initial}
          animate="visible"
        >
          <motion.h1 id="about-heading" className="text-h1 font-extrabold leading-[1.1] tracking-[-0.02em] text-foreground" variants={variants.slideLeft}>
            Hi, I'm <span>{PERSONAL.name}</span>
          </motion.h1>

          <motion.p className="text-[clamp(1.3rem,2.8vw,1.75rem)] font-normal text-muted-foreground m-0" variants={variants.slideLeft}>
            {PERSONAL.role}
          </motion.p>

          <motion.p className="max-w-[56ch] text-lg leading-[1.75] text-muted-foreground m-0" variants={variants.slideLeft}>
            {ABOUT_DESCRIPTION}
          </motion.p>

          {/* Skill badge'leri */}
          <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-2"
            variants={variants.stagger}
          >
            {SKILLS.map((skill) => (
              <motion.span key={skill.name} variants={variants.fadeUp}>
                <SkillBadge name={skill.name} icon={skill.icon} color={skill.color} />
              </motion.span>
            ))}
          </motion.div>

          {/* CTA butonları */}
          <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-3 mt-2"
            variants={variants.stagger}
          >
            <motion.a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-outline hero-btn-linkedin"
              variants={variants.fadeUp}
              onClick={() => analytics.linkedinClick()}
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
              onClick={() => analytics.githubClick()}
            >
              <FaGithub aria-hidden="true" />
              GitHub
            </motion.a>
            <motion.a
              href={RESUME_URL}
              download
              className="hero-btn-primary"
              variants={variants.fadeUp}
              onClick={() => analytics.resumeDownload()}
            >
              Download Resume
              <FaDownload aria-hidden="true" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Sağ: Fotoğraf (sadece desktop) ── */}
        <motion.div
          className="shrink-0 hidden md:block"
          variants={variants.slideRight}
          initial={initial}
          animate="visible"
        >
          <div className="w-[clamp(260px,32vw,400px)]">
            <img
              src={ABOUT_PHOTO}
              alt={PERSONAL.name}
              className="w-full h-auto block rounded-2xl"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(PERSONAL.name)}&size=320&background=6366f1&color=fff`;
              }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
