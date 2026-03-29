import {
  SiTypescript,  SiPython,      SiReact,      SiNodedotjs,    SiTailwindcss,
  SiPostgresql,  SiDocker,      SiGit,        SiFastapi,
  SiHtml5,       SiCss,         SiSass,       SiJavascript,   SiNextdotjs,
  SiBootstrap,   SiMui,
  SiFigma,       SiCanva,
  SiDjango,      SiSocketdotio, SiSwagger,
  SiGrafana,     SiPrometheus,  SiGithub,     SiShadcnui,   SiDigitalocean, SiHeroku, SiRailway,
  SiMongodb,     SiSqlite,      SiMysql,      SiFirebase,     SiRedis,
  SiJira,        SiBitbucket,   SiPostman,
} from 'react-icons/si';
import { FaAws, FaImage, FaDraftingCompass, FaFileExcel, FaFileWord } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import type { Skill } from '../../data/portfolio';

const ICON_MAP: Record<string, IconType> = {
  SiTypescript,  SiPython,      SiReact,      SiNodedotjs,    SiTailwindcss,
  SiPostgresql,  SiDocker,      SiGit,        SiFastapi,
  SiHtml5,       SiCss,         SiSass,       SiJavascript,   SiNextdotjs,
  SiBootstrap,   SiMui,
  SiFigma,       SiCanva,
  SiDjango,      SiSocketdotio, SiSwagger,
  SiGrafana,     SiPrometheus,  SiGithub, SiShadcnui,   SiDigitalocean, SiHeroku, SiRailway,
  SiMongodb,     SiSqlite,      SiMysql,      SiFirebase,     SiRedis,
  SiJira,        SiBitbucket,   SiPostman,
  FaAws,         FaImage,       FaDraftingCompass, FaFileExcel, FaFileWord,
};

type Props = Pick<Skill, 'name' | 'icon' | 'color'>;

const SkillBadge = ({ name, icon, color }: Props) => {
  const IconComp = ICON_MAP[icon];

  return (
    <span className="inline-flex items-center gap-[0.35rem] px-3 py-[0.25rem] rounded-full border border-border bg-muted text-foreground text-xs font-medium">
      {IconComp && <IconComp style={{ color }} aria-hidden="true" />}
      {name}
    </span>
  );
};

export default SkillBadge;
