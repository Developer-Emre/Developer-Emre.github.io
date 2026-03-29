import { motion, useReducedMotion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaTools, FaPalette, FaWrench } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { SKILLS_INTRO, SKILL_CATEGORIES } from '../data/portfolio';
import SkillBadge from '../components/ui/SkillBadge';
import { VIEWPORT, staggerVariant, cardVariant } from '../lib/animation';
import SectionHeader from '../components/ui/SectionHeader';

// ── Category icon map (ICON_MAP pattern — Navbar ile tutarlı) ─────────────────
const CATEGORY_ICON_MAP: Record<string, IconType> = {
  FaCode,
  FaServer,
  FaDatabase,
  FaTools,
  FaPalette,
  FaWrench,
};

// ── Component ─────────────────────────────────────────────────────────────────
const Skills = () => {
  const shouldReduce = useReducedMotion();
  const initial = shouldReduce ? 'visible' : 'hidden';

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-28 px-6">

      {/* ── Section header — Experience / Projects ile aynı pattern ── */}
      <SectionHeader
        id="skills-heading"
        label={SKILLS_INTRO.sectionTitle}
        heading={SKILLS_INTRO.sectionHeading}
        subtext={SKILLS_INTRO.sectionSubtext}
        initial={initial}
      />

      {/* ── Kategori kartları ── */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={staggerVariant}
        initial={initial}
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {SKILL_CATEGORIES.map((category) => {
          const IconComp = CATEGORY_ICON_MAP[category.iconKey];

          return (
            <motion.div
              key={category.id}
              className="flex flex-col gap-5 p-7 rounded-2xl border border-muted-foreground/30 bg-muted/20 shadow-sm transition-all duration-300 hover:border-muted-foreground/60 hover:bg-muted/40 hover:-translate-y-1 hover:shadow-lg"
              variants={cardVariant}
            >
              {/* Kategori başlığı */}
              <div className="flex items-center gap-3">
                {IconComp && (
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted border border-muted-foreground/30 text-muted-foreground text-base shrink-0">
                    <IconComp aria-hidden="true" />
                  </span>
                )}
                <h3 className="text-base font-bold text-foreground m-0">
                  {category.label}
                </h3>
              </div>

              {/* Divider */}
              <div className="h-px bg-muted-foreground/10" aria-hidden="true" />

              {/* Skill badge'leri */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                    color={skill.color}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
};

export default Skills;
