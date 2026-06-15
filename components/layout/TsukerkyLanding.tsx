"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BottleCanvas } from "@/components/visuals/BottleCanvas";
import { FlavorControls } from "@/components/visuals/FlavorControls";
import { StickerField } from "@/components/visuals/StickerField";
import type { FlavorId } from "@/components/visuals/flavor";
import { flavors } from "@/components/visuals/flavor";

gsap.registerPlugin(ScrollTrigger);

const editorialCards = [
  {
    kicker: "01 / Nostalgia",
    title: "A sweet flashback built for midnight rooms.",
    body: "Tsukerky traduce el recuerdo de los caramelos de kiosco en un vodka limpio, frio y brillante: una botella rosa con pulso urbano.",
    meta: "Tutti-frutti vapor / chrome pink glass",
    placement: "md:col-start-2 md:col-span-5",
  },
  {
    kicker: "02 / Clubbing",
    title: "Neon left. Violet right. Bass in the glass.",
    body: "La direccion de arte cruza luz de estudio, cyberpunk soft y una etiqueta editorial para que la botella se sienta como un objeto de moda.",
    meta: "Afterhours ritual / Y2K stickers",
    placement: "md:col-start-7 md:col-span-5",
  },
  {
    kicker: "03 / Filtered",
    title: "Ten times filtered, then pushed into candy mode.",
    body: "La experiencia visual deja respirar el producto: grandes silencios, tipografia monumental y microinteracciones precisas que no compiten con el 3D.",
    meta: "30% ALC. VOL / 750 ML",
    placement: "md:col-start-3 md:col-span-4",
  },
];

export function TsukerkyLanding() {
  const [activeFlavor, setActiveFlavor] = useState<FlavorId>("pink");

  useEffect(() => {
    const flavor = flavors[activeFlavor];
    gsap.to(document.documentElement, {
      "--flavor": flavor.accent,
      "--flavor-soft": flavor.soft,
      "--flavor-deep": flavor.deep,
      "--flavor-rgb": flavor.rgb,
      duration: 0.9,
      ease: "power3.out",
    });
  }, [activeFlavor]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-word]", {
        yPercent: 105,
        rotate: 2.4,
        opacity: 0,
        duration: 1.15,
        stagger: 0.13,
        ease: "power4.out",
      });

      gsap.utils.toArray<HTMLElement>("[data-editorial-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 90, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              end: "bottom 42%",
              scrub: 0.8,
            },
          },
        );
      });

      gsap.fromTo(
        "[data-marquee]",
        { xPercent: 0 },
        {
          xPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="editorial-shell min-h-[360vh] overflow-hidden">
      <BottleCanvas flavor={activeFlavor} />
      <StickerField />
      <TechnicalEdgeCopy />
      <div className="noise" aria-hidden="true" />

      <section className="relative grid min-h-screen grid-cols-6 px-4 pb-28 pt-6 sm:px-8 md:grid-cols-12 md:gap-x-6 md:px-10 lg:px-14">
        <div className="col-span-6 flex items-start justify-between text-[0.62rem] font-black uppercase tracking-[0.32em] text-white/55 md:col-span-12">
          <span>Tsukerky Vodka</span>
          <span className="hidden sm:block">Made with vodka / Pink Candy</span>
          <span>2026 drop</span>
        </div>

        <div className="col-span-6 mt-16 md:col-span-7 md:mt-20">
          <p className="max-w-sm text-[0.67rem] font-black uppercase tracking-[0.34em] text-[var(--flavor-soft)]">
            Nostalgia de caramelo + energia de club + objeto editorial
          </p>
          <h1
            className="display-serif mt-8 max-w-[12ch] font-black uppercase leading-[0.76] tracking-[-0.09em] text-white"
            style={{ fontSize: "clamp(4.9rem, 14.8vw, 16rem)" }}
          >
            <span className="block overflow-hidden">
              <span data-hero-word className="block">
                The
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-hero-word
                className="block text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,.92)" }}
              >
                Candy
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-word className="block text-[var(--flavor-soft)]">
                Vodka
              </span>
            </span>
          </h1>
        </div>

        <div className="z-10 col-span-6 mt-auto grid gap-4 md:col-start-9 md:col-span-3 md:pb-20">
          <div className="rounded-[2rem] border border-white/15 bg-white/[0.055] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-white/48">
              Liquid brief
            </p>
            <p className="display-serif mt-4 text-3xl font-black leading-none text-white">
              {flavors[activeFlavor].label}
            </p>
            <p className="mt-4 text-sm leading-6 text-white/62">
              Reflejos teñidos por sabor, vidrio translúcido y parallax real
              para una botella que parece suspendida en pista.
            </p>
          </div>
        </div>
      </section>

      <section className="relative grid min-h-screen grid-cols-6 gap-y-14 px-4 py-24 sm:px-8 md:grid-cols-12 md:gap-x-6 md:px-10 lg:px-14">
        {editorialCards.map((card) => (
          <article
            key={card.kicker}
            data-editorial-card
            className={`col-span-6 ${card.placement} rounded-[2.4rem] border border-white/12 bg-black/20 p-6 shadow-2xl shadow-black/30 backdrop-blur-md md:p-8`}
          >
            <p className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-[var(--flavor-soft)]">
              {card.kicker}
            </p>
            <h2 className="display-serif mt-5 text-5xl font-black leading-[0.9] tracking-[-0.06em] text-white md:text-6xl">
              {card.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/64">
              {card.body}
            </p>
            <p className="mt-8 border-t border-white/12 pt-4 text-[0.64rem] font-black uppercase tracking-[0.28em] text-white/42">
              {card.meta}
            </p>
          </article>
        ))}
      </section>

      <section className="relative flex min-h-screen items-end overflow-hidden px-4 py-28 sm:px-8 md:px-10 lg:px-14">
        <div
          data-marquee
          className="display-serif whitespace-nowrap text-[clamp(5rem,18vw,20rem)] font-black uppercase leading-none tracking-[-0.1em] text-white/[0.07]"
        >
          Pink Candy / Purple Candy / Tsukerky Vodka / Filtered /
        </div>
        <div className="absolute bottom-28 left-4 z-10 max-w-xl sm:left-8 md:left-10 lg:left-14">
          <p className="text-[0.64rem] font-black uppercase tracking-[0.34em] text-[var(--flavor-soft)]">
            Final note
          </p>
          <h2 className="display-serif mt-5 text-5xl font-black leading-[0.9] tracking-[-0.06em] md:text-7xl">
            Built like a bottle ad that escaped into the club.
          </h2>
        </div>
      </section>

      <FlavorControls
        activeFlavor={activeFlavor}
        onFlavorChange={setActiveFlavor}
      />
    </main>
  );
}

function TechnicalEdgeCopy() {
  return (
    <>
      <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 text-[0.58rem] font-black uppercase tracking-[0.26em] text-white/38 md:block">
        <p className="vertical-copy">30% ALC. VOL / 750 ML / TEN TIMES FILTERED</p>
      </div>
      <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 text-[0.58rem] font-black uppercase tracking-[0.26em] text-white/38 md:block">
        <p className="vertical-copy rotate-180">
          Pink light left / Violet light right / Cyber candy
        </p>
      </div>
      <div className="fixed left-4 top-4 z-40 text-[0.56rem] font-black uppercase tracking-[0.28em] text-white/35 sm:left-8 sm:top-8">
        Batch TSU-10
      </div>
      <div className="fixed right-4 top-4 z-40 text-right text-[0.56rem] font-black uppercase tracking-[0.28em] text-white/35 sm:right-8 sm:top-8">
        Chrome candy system
      </div>
    </>
  );
}
