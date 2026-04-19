"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlogCard } from "../blog/BlogCard";
import { Button } from "@/components/ui/button";
import type { Herosection } from "@/lib/types";

export interface HeroSectionCta {
  label: string;
  link: string;
}

interface HeroSectionProps {
  herosection: Herosection;
  /** Reuses CMS header primary CTA (same labels/links as header). */
  heroCta?: HeroSectionCta | null;
  /** Reuses a CMS nav item different from the primary CTA link when possible. */
  heroSecondary?: HeroSectionCta | null;
}

const HeroSection = ({
  herosection,
  heroCta,
  heroSecondary,
}: HeroSectionProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroViewportRef = useRef<HTMLDivElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(gridRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
      gsap.from(glowRef.current, {
        scale: 0.85,
        opacity: 0,
        duration: 1.15,
        ease: "power3.out",
      });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-animate-title", { y: 48, opacity: 0, duration: 0.85 }, 0.12)
        .from(".hero-animate-sub", { y: 26, opacity: 0, duration: 0.65 }, "-=0.5")
        .from(
          ".hero-cta .epic-btn",
          { y: 22, opacity: 0, stagger: 0.12, duration: 0.55 },
          "-=0.35"
        )
        .from(".hero-animate-desc", { y: 16, opacity: 0, duration: 0.5 }, "-=0.35")
        .from(
          ".hero-blog-card",
          {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.25"
        );

      const viewport = heroViewportRef.current;
      const layer = parallaxLayerRef.current;
      /* Subtle parallax — small range + extra image bleed avoids exposing solid hero fill while scrolling */
      if (!reduceMotion && viewport && layer) {
        gsap.fromTo(
          layer,
          { y: "2%" },
          {
            y: "-4%",
            ease: "none",
            scrollTrigger: {
              trigger: viewport,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [herosection, heroCta, heroSecondary]);

  if (!herosection) return null;

  const bgSrc =
    typeof herosection.backgroundImage === "string"
      ? herosection.backgroundImage
      : "";

  return (
    <section ref={rootRef} className="relative">
      {/* Full-bleed cinematic hero (Wix Epic-style: viewport height, diagonal exit, HUD frame) */}
      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
        <div
          ref={heroViewportRef}
          className="relative min-h-[calc(100dvh-5rem)] overflow-hidden border-b border-primary/30 bg-[#030208] md:min-h-[calc(100dvh-4.5rem)]"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 3.25rem), 72% 100%, 0 calc(100% - 1.25rem))",
          }}
        >
          {/* Base tint when image loads — stays close to photo shadows so parallax never flashes wrong hue */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_20%,rgba(20,18,45,0.5),#030208)]"
            aria-hidden
          />

          {bgSrc ? (
            <div className="absolute inset-0 overflow-hidden">
              <div
                ref={parallaxLayerRef}
                className="absolute inset-[-20%] min-h-[140%] will-change-transform"
              >
                <Image
                  src={bgSrc}
                  alt={herosection?.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover brightness-[0.92] contrast-[1.06] saturate-[1.12]"
                />
              </div>
            </div>
          ) : null}

          <div
            ref={glowRef}
            className="epic-hero-glow pointer-events-none absolute -top-[50%] left-1/2 z-[1] h-[115%] w-[140%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(0,255,209,0.28),rgba(255,45,146,0.1),transparent)] blur-3xl"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.45) 2px, rgba(255,255,255,0.45) 3px)",
            }}
            aria-hidden
          />
          <div
            ref={gridRef}
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.1]"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
              backgroundSize: "56px 56px",
              maskImage:
                "linear-gradient(to bottom, black 0%, transparent 88%), linear-gradient(to top, black 0%, transparent 35%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, transparent 88%), linear-gradient(to top, black 0%, transparent 35%)",
              animation: "epic-grid-shift 20s linear infinite",
            }}
            aria-hidden
          />

          {/* Vignettes: edge + bottom only so the photo stays visible (Wix-style readable hero, not a flat color wash) */}
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#030208]/95 via-[#030208]/15 via-50% to-transparent" />
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#030208]/70 via-[#030208]/10 to-transparent" />
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#030208]/40 via-transparent to-transparent" />

          {/* Video-style scan sweep over graded hero (CSS; respects prefers-reduced-motion) */}
          <div
            className="pointer-events-none absolute inset-0 z-[3] overflow-hidden mix-blend-overlay"
            aria-hidden
          >
            <div className="hero-scan-beam" />
          </div>

          {/* HUD corners — decorative only */}
          <div
            className="pointer-events-none absolute left-4 top-20 z-20 h-16 w-16 border-l-2 border-t-2 border-primary/50 sm:left-6 md:left-10 md:top-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-28 right-4 z-20 h-16 w-16 border-b-2 border-r-2 border-accent/50 sm:right-6 md:bottom-32 md:right-10"
            aria-hidden
          />

          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-28 pt-28 md:justify-center md:pb-36 md:pt-20">
            <div className="container w-full">
              <div className="relative max-w-3xl border-l-2 border-primary/70 pl-5 sm:pl-7 md:max-w-2xl md:pl-9">
                <div
                  className="pointer-events-none absolute -left-px top-0 h-8 w-px bg-gradient-to-b from-primary to-transparent"
                  aria-hidden
                />
                <h1 className="hero-animate-title font-display text-[clamp(2.75rem,10vw,6.75rem)] leading-[0.92] tracking-[0.02em] text-white [text-shadow:0_0_60px_rgba(0,255,209,0.35),0_0_100px_rgba(255,45,146,0.2),0_4px_24px_rgba(0,0,0,0.85)]">
                  {herosection?.title}
                </h1>
                {herosection?.excerpt ? (
                  <p className="hero-animate-sub font-condensed mt-6 max-w-xl text-base font-medium leading-relaxed tracking-wide text-white/90 sm:text-lg">
                    {herosection.excerpt}
                  </p>
                ) : null}

                {(heroCta?.label || heroSecondary?.label) && (
                  <div className="hero-cta relative z-[25] mt-9 flex flex-wrap gap-3 sm:gap-4">
                    {heroCta?.label && heroCta?.link ? (
                      <Button
                        asChild
                        size="lg"
                        className="epic-btn font-condensed border border-primary/50 bg-primary px-8 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_0_36px_-4px_var(--epic-glow)] transition hover:brightness-110"
                      >
                        <Link href={heroCta.link}>{heroCta.label}</Link>
                      </Button>
                    ) : heroCta?.label ? (
                      <Button
                        type="button"
                        size="lg"
                        disabled
                        className="epic-btn font-condensed px-8 text-sm font-bold uppercase tracking-[0.2em] opacity-80"
                      >
                        {heroCta.label}
                      </Button>
                    ) : null}
                    {heroSecondary?.label && heroSecondary?.link ? (
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="epic-btn font-condensed border-2 border-white/80 !bg-black/60 px-8 text-sm font-bold uppercase tracking-[0.2em] !text-white shadow-[0_4px_28px_rgba(0,0,0,0.55)] backdrop-blur-md transition hover:!border-primary hover:!bg-primary/25 hover:!text-white hover:shadow-[0_0_32px_-6px_var(--epic-glow)]"
                      >
                        <Link href={heroSecondary.link}>
                          {heroSecondary.label}
                        </Link>
                      </Button>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent"
            aria-hidden
          />
        </div>
      </div>

      {herosection?.description ? (
        <p className="hero-animate-desc mx-auto mt-12 max-w-2xl px-4 py-6 text-center text-sm leading-relaxed text-muted-foreground sm:mt-14 sm:py-8 sm:text-base">
          {herosection.description}
        </p>
      ) : null}

      {herosection?.blogs && herosection.blogs.length > 0 ? (
        <div className="relative my-14 sm:my-16 md:my-20">
          <div
            className="pointer-events-none absolute -top-6 left-1/2 h-px w-24 -translate-x-1/2 bg-primary/60"
            aria-hidden
          />
          <div className="container grid grid-cols-1 gap-6 md:grid-cols-3">
            {herosection.blogs.map((blog) => (
              <div key={blog._id} className="hero-blog-card">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default HeroSection;
