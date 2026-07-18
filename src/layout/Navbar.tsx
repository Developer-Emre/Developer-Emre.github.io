import { useState, useEffect, useCallback } from 'react';
import { FaUser, FaCode, FaEnvelope, FaTools, FaBriefcase, FaBars, FaTimes } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import type { IconType } from 'react-icons';
import { NAV_LINKS, PERSONAL, ABOUT_PHOTO, avatarFallbackUrl } from '../data/portfolio';
import { useTheme } from '../context/useTheme';
import { analytics } from '../lib/analytics';

// portfolio.ts'teki icon string'lerini bileşene bağlar
const ICON_MAP: Record<string, IconType> = {
  FaUser,
  FaCode,
  FaEnvelope,
  FaTools,
  FaBriefcase,
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Escape tuşuyla menüyü kapat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeMenu]);

  // Menü açıkken scroll'u engelle
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-4 z-50 min-h-18 flex flex-col justify-center items-center">

      <div className="fixed top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 h-17 px-4 py-4 max-w-225 min-w-70 w-fit bg-background/60 backdrop-blur-md border-b border-border rounded-full transition-colors duration-300">

        {/* ── Avatar (sadece mobil) ── */}
        <img
          src={ABOUT_PHOTO}
          alt={PERSONAL.name}
          className="md:hidden w-9 h-9 rounded-full object-cover object-top shrink-0 border border-border"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              avatarFallbackUrl(72);
          }}
        />

        {/* ── Desktop nav linkleri ── */}
        <nav className="hidden md:flex items-center space-x-8 mx-20" aria-label="Ana navigasyon">
          {NAV_LINKS.map((link) => {
            const Icon = ICON_MAP[link.icon];
            return (
              <a
                key={link.href}
                href={link.href}
                aria-label={link.label}
                title={link.label}
                onClick={() => analytics.navClick(link.label)}
                className="flex items-center gap-1.5 p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-white/10 transition-all duration-200"
              >
                <Icon size={18} aria-hidden="true" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* ── Dark mode toggle ── */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Açık moda geç' : 'Koyu moda geç'}
          className="ml-auto p-2 rounded-full text-foreground/50 hover:text-foreground hover:bg-white/10 transition-all duration-200 cursor-pointer"
        >
          {theme === 'dark'
            ? <MdLightMode size={18} aria-hidden="true" />
            : <MdDarkMode  size={18} aria-hidden="true" />}
        </button>

        {/* ── Hamburger (sadece mobil) ── */}
        <button
          type="button"
          className="md:hidden p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-white/10 transition-all duration-200 cursor-pointer"
          aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          {isMenuOpen
            ? <FaTimes size={18} aria-hidden="true" />
            : <FaBars  size={18} aria-hidden="true" />}
        </button>

      </div>

      {/* ── Mobil menü overlay ── */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            aria-hidden="true"
            onClick={closeMenu}
          />

          {/* Drawer */}
          <nav
            id="mobile-nav"
            className="fixed top-20 left-4 right-4 z-50 flex flex-col gap-1 p-3 rounded-2xl border border-border bg-background/95 backdrop-blur-md shadow-lg md:hidden"
            aria-label="Mobil navigasyon"
          >
            {NAV_LINKS.map((link) => {
              const Icon = ICON_MAP[link.icon];
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/70 hover:text-foreground hover:bg-muted transition-all duration-200"
                >
                  <Icon size={18} aria-hidden="true" />
                  <span className="text-base font-medium">{link.label}</span>
                </a>
              );
            })}
          </nav>
        </>
      )}

    </header>
  );
};

export default Navbar;
