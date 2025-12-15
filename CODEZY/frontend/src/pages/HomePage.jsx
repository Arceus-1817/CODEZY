import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react';

const navLinks  = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]
  

const HomePage = () => {
  const [open, setOpen] = useState(false);
 return (
    
         <header className="fixed top-0 left-0 right-0 z-50">
      {/* Blur / glass background */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-4">
        <nav className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-lg shadow-black/10 backdrop-blur-xl dark:bg-neutral-900/60">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-bold shadow-md">
              S
            </span>
            <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            my
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative text-sm font-medium text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
              >
                {link.name}
                <span className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* CTA button */}
            <a
              href="#get-started"
              className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition hover:scale-[1.02] hover:shadow-lg active:scale-95"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-2 text-slate-800 shadow-sm backdrop-blur md:hidden dark:text-slate-100"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg
              className={`h-6 w-6 transition-transform duration-300 ${
                open ? "rotate-90" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
            >
              {open ? (
                <path
                  d="M6 6L18 18M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile dropdown */}
        {open && (
          <div className="mt-2 rounded-2xl border border-white/15 bg-white/90 p-3 shadow-lg backdrop-blur-xl md:hidden dark:bg-neutral-900/95">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100/70 dark:text-slate-100 dark:hover:bg-neutral-800"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a
              href="#get-started"
              className="mt-3 block rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-md hover:shadow-lg active:scale-[0.98]"
              onClick={() => setOpen(false)}
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </header>
  )
}

export default HomePage;
