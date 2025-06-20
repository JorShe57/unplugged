'use client';

import React, { useState, useEffect } from 'react';
import { useSmoothScroll } from './ScrollUtils';

const navLinks = [
  { label: 'About', href: '#about', external: false },
  { label: 'Menu', href: '#menu', external: false },
  { label: 'Events', href: '#events', external: false },
  { label: 'Contact', href: '#contact', external: false },
  { label: 'Facebook', href: 'https://www.facebook.com/unplugbrew/', external: true },
  { label: 'Leave a Review', href: 'https://g.co/kgs/76LCxnz', external: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollToElement } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, external: boolean) => {
    if (!external) {
      const elementId = href.replace('#', '');
      scrollToElement(elementId, { offset: 80, duration: 800 });
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-brewery-dark/95 backdrop-blur-md shadow-lg' 
          : 'bg-brewery-gold/20 backdrop-blur-md'
      } border-b border-brewery-gold/30`}
      style={{ 
        boxShadow: scrolled 
          ? '0 4px 32px rgba(218, 165, 32, 0.2)' 
          : '0 0 32px 4px rgba(255, 215, 0, 0.35)' 
      }}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <a 
          href="/" 
          className="flex items-center hover:scale-105 transition-transform duration-200"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src="/favicon.webp" alt="Unplugged Brewery Logo" className="h-10 w-10 object-contain" />
        </a>
        
        <button
          className="md:hidden text-brewery-gold focus:outline-none hover:scale-110 transition-transform duration-200"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
        
        <ul className={`flex-col md:flex-row md:flex gap-8 md:gap-6 items-center md:static absolute left-0 w-full md:w-auto bg-brewery-dark/95 md:bg-transparent backdrop-blur-md transition-all duration-300 ease-in-out ${
          open ? 'top-16' : '-top-96'
        } md:top-0`}>
          {navLinks.map(link => (
            <li key={link.href}>
              {link.external ? (
                <a
                  href={link.href}
                  className="block py-2 px-4 text-brewery-gold hover:text-brewery-primary transition-all duration-200 cursor-pointer hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <button
                  onClick={() => handleNavClick(link.href, false)}
                  className="block py-2 px-4 text-brewery-gold hover:text-brewery-primary transition-all duration-200 cursor-pointer hover:scale-105"
                >
                  {link.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
} 