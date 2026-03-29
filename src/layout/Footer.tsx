import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { PERSONAL } from '../data/portfolio';

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="py-10 px-6 border-t border-muted-foreground/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Sol: isim + rol */}
        <div className="flex flex-col items-center sm:items-start gap-0.5">
          <span className="text-sm font-bold text-foreground">
            {PERSONAL.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {PERSONAL.role}
          </span>
        </div>

        {/* Orta: copyright */}
        <p className="text-xs text-muted-foreground m-0 order-last sm:order-none">
          © {CURRENT_YEAR} — All rights reserved.
        </p>

        {/* Sağ: sosyal linkler */}
        <div className="flex items-center gap-1">
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-lg" aria-hidden="true" />
          </a>
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
            aria-label="GitHub"
          >
            <FaGithub className="text-lg" aria-hidden="true" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
