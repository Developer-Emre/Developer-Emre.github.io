import { motion } from 'framer-motion';
import { fadeUpVariant, staggerVariant, VIEWPORT } from '../../lib/animation';

interface Props {
  id:      string;
  label:   string;
  heading: string;
  subtext: string;
  initial: 'hidden' | 'visible';
}

const SectionHeader = ({ id, label, heading, subtext, initial }: Props) => (
  <motion.div
    className="max-w-6xl mx-auto flex flex-col items-center text-center gap-4 mb-20"
    variants={staggerVariant}
    initial={initial}
    whileInView="visible"
    viewport={VIEWPORT}
  >
    <motion.span
      className="text-xs font-bold tracking-[0.16em] uppercase px-4 py-1.5 rounded-full border border-muted-foreground/30 text-muted-foreground"
      variants={fadeUpVariant}
    >
      {label}
    </motion.span>

    <motion.h2
      id={id}
      className="text-[clamp(1.875rem,4vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.025em] text-foreground m-0"
      variants={fadeUpVariant}
    >
      {heading}
    </motion.h2>

    <motion.p
      className="text-[0.9375rem] leading-[1.75] text-muted-foreground max-w-[52ch] m-0"
      variants={fadeUpVariant}
    >
      {subtext}
    </motion.p>

    <motion.div
      className="w-16 h-px bg-muted-foreground/30 mt-2"
      variants={fadeUpVariant}
    />
  </motion.div>
);

export default SectionHeader;
