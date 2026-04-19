"use client";

import Link from "next/link";
import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import type { Header as HeaderType } from "@/lib/types";

export function Header({ header }: { header: HeaderType | null }) {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    tl.from(
      ".nav-item",
      {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.3"
    );

    tl.from(
      ".social-icon",
      {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.3,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-b border-white/10 bg-background/90 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/75"
          : "border-b border-transparent bg-background/15 backdrop-blur-md"
      )}
    >
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3">
          <div className="flex h-14 max-w-6xl items-center md:h-16">
            <Link
              href="/"
              className="flex items-center gap-3 transition-opacity hover:opacity-90"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary/25 via-card to-accent/20 shadow-[0_0_24px_-4px_var(--epic-glow)]">
                {header?.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={header.logoUrl}
                    alt=""
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <PenLine className="h-5 w-5 text-primary" />
                )}
              </div>
              <span className="font-display bg-gradient-to-r from-white via-primary to-accent bg-clip-text p-1 text-2xl tracking-[0.14em] text-transparent">
                Blogify
              </span>
            </Link>
          </div>

          <div className="order-3 flex w-full flex-wrap items-center gap-4 md:order-2 md:w-auto md:gap-8">
            {header?.navigation?.map((item, index) => (
              <nav key={index} className="nav-item flex items-center gap-1">
                <Link
                  href={item?.link || "#"}
                  className="font-condensed relative text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
                >
                  {item?.label}
                </Link>
              </nav>
            ))}

            {header?.cta?.label && header?.cta?.link ? (
              <Button
                asChild
                className="nav-item font-condensed w-full border border-primary/50 bg-primary text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_28px_-4px_var(--epic-glow)] transition-all hover:bg-primary hover:shadow-[0_0_40px_-2px_var(--epic-glow)] sm:w-auto"
              >
                <Link href={header.cta.link}>{header.cta.label}</Link>
              </Button>
            ) : header?.cta?.label ? (
              <Button
                type="button"
                className="nav-item font-condensed w-full border border-primary/50 bg-primary text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_28px_-4px_var(--epic-glow)] sm:w-auto"
                disabled
              >
                {header.cta.label}
              </Button>
            ) : null}
          </div>

          <div className="order-2 flex items-center gap-4 md:order-3 md:gap-6">
            {header?.socialIcons?.map((item, index) => (
              <Link
                key={index}
                href={item?.link || "#"}
                target={item?.openInNewTab ? "_blank" : "_self"}
                rel={item?.openInNewTab ? "noopener noreferrer" : ""}
                className="social-icon text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Image
                  src={item.iconUrl}
                  alt="social icon"
                  width={20}
                  height={20}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
