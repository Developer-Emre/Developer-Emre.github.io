import { motion, useReducedMotion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { PROJECTS_INTRO, PROJECTS } from '../data/portfolio';
import type { ProjectStatus } from '../data/portfolio';
import { VIEWPORT, staggerVariant, cardVariant } from '../lib/animation';
import SectionHeader from '../components/ui/SectionHeader';
import { analytics } from '../lib/analytics';

const STATUS_CONFIG: Record<ProjectStatus, { label: string }> = {
  production:  { label: 'Production'  },
  development: { label: 'Development' },
} as const;

// ── Component ─────────────────────────────────────────────────────────────────
const Projects = () => {
  const shouldReduce = useReducedMotion();
  const initial = shouldReduce ? 'visible' : 'hidden';

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-28 px-6">

      {/* ── Section header ── */}
      <SectionHeader
        id="projects-heading"
        label={PROJECTS_INTRO.sectionTitle}
        heading={PROJECTS_INTRO.sectionHeading}
        subtext={PROJECTS_INTRO.sectionSubtext}
        initial={initial}
      />

      {/* ── Project grid ── */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerVariant}
        initial={initial}
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {PROJECTS.map((project) => (
          <motion.article
            key={project.id}
            className="group flex flex-col rounded-2xl border border-muted-foreground/30 bg-muted/20 overflow-hidden shadow-sm transition-all duration-300 hover:border-muted-foreground/60 hover:bg-muted/40 hover:-translate-y-1 hover:shadow-lg"
            variants={cardVariant}
          >
            {/* ── Görsel alanı ── */}
            <div className="relative w-full aspect-video overflow-hidden bg-muted/50">
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo`}
                  className="block w-full h-full"
                  tabIndex={0}
                  onClick={() => analytics.projectLive(project.title)}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: 'repeating-linear-gradient(to right, currentColor 0 1px, transparent 1px 32px), repeating-linear-gradient(to bottom, currentColor 0 1px, transparent 1px 32px)' }}
                      />
                      <span className="relative text-xs font-bold tracking-[0.14em] uppercase text-muted-foreground/50">Preview</span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-xs font-semibold text-background bg-foreground/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <FaArrowUpRightFromSquare aria-hidden="true" />
                      Visit Site
                    </span>
                  </div>
                </a>
              ) : (
                <div className="w-full h-full">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: 'repeating-linear-gradient(to right, currentColor 0 1px, transparent 1px 32px), repeating-linear-gradient(to bottom, currentColor 0 1px, transparent 1px 32px)' }}
                      />
                      <span className="relative text-xs font-bold tracking-[0.14em] uppercase text-muted-foreground/50">Preview</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Kart içeriği ── */}
            <div className="flex flex-col gap-4 p-7 flex-1">

            {/* Status badge + link ikonları */}
            <div className="flex items-center justify-between">
              {/* Status */}
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide"
                style={{ color: `var(--status-${project.status})` }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: `var(--status-${project.status})` }}
                  aria-hidden="true"
                />
                {STATUS_CONFIG[project.status].label}
              </span>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                    aria-label={`${project.title} GitHub repository`}
                    onClick={() => analytics.projectGithub(project.title)}
                  >
                    <FaGithub className="text-lg" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            {/* Başlık + açıklama */}
            <div className="flex flex-col gap-2 flex-1">
              <h3 className="text-base font-bold text-foreground m-0 leading-snug">
                {project.title}
              </h3>
              <p className="text-body-sm leading-[1.75] text-muted-foreground m-0">
                {project.description}
              </p>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-muted-foreground/30">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-muted-foreground/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            </div>{/* /kart içeriği */}
          </motion.article>
        ))}
      </motion.div>

    </section>
  );
};

export default Projects;
