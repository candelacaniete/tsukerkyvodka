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
    kicker: "01 / Antojo",
    title: "Un flashback dulce con actitud de pista.",
    body: "Tsukerky mezcla nostalgia de kiosco, estética Y2K y una vibra limpia para tomarlo bien frío, sin pedir permiso.",
    meta: "Sabor tutti-frutti / vidrio rosa pastel",
    placement: "md:col-start-2 md:col-span-4",
  },
  {
    kicker: "02 / Modo chicle",
    title: "Suave como nube, brillante como pegatina nueva.",
    body: "La botella flota entre rosa chicle, lila pastel y blanco nube: premium, juguetona y lista para aparecer en todas las fotos.",
    meta: "Nube líquida / brillo de caramelo",
    placement: "md:col-start-8 md:col-span-4",
  },
  {
    kicker: "03 / Ritual frío",
    title: "10 veces filtrado y directo al modo chicle.",
    body: "Microinteracciones sutiles, pegatinas flotantes y una composición editorial con aire para que el producto sea el centro del mundo Tsukerky.",
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
    <main className="editorial-shell min-h-[340vh] overflow-hidden">
      <BottleCanvas flavor={activeFlavor} />
      <StickerField />
      <TechnicalEdgeCopy />
      <div className="noise" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-[-8vw] top-[8vh] z-0 select-none overflow-hidden"
      >
        <p className="display-serif text-center text-[clamp(5rem,18vw,21rem)] font-black uppercase leading-[0.75] tracking-[-0.12em] text-pink-200/20 mix-blend-multiply">
          THE CANDY VODKA
        </p>
      </div>

      <section className="relative z-10 grid min-h-screen grid-cols-6 px-6 pb-36 pt-8 sm:px-10 md:grid-cols-12 md:gap-x-8 md:px-14 lg:px-20">
        <div className="col-span-6 flex items-start justify-between text-[0.62rem] font-black uppercase tracking-[0.32em] text-[#8d6f86] md:col-span-12">
          <span>Tsukerky Vodka</span>
          <span className="hidden sm:block">Hecho con vodka / sabor chicle</span>
          <span>Colección 2026</span>
        </div>

        <div className="col-span-6 mt-20 md:col-span-6 md:mt-24">
          <p className="max-w-md text-[0.72rem] font-black uppercase tracking-[0.34em] text-[#9f6e91]">
            Nostalgia de caramelo + estética Y2K + vodka con actitud
          </p>
          <h1
            className="display-serif relative z-20 mt-8 max-w-[10ch] font-black uppercase leading-[0.78] tracking-[-0.09em] text-[#56304a]"
            style={{ fontSize: "clamp(4.6rem, 12.5vw, 13rem)" }}
          >
            <span className="block overflow-hidden">
              <span data-hero-word className="block">
                Sabor
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-hero-word
                className="block text-transparent"
                style={{ WebkitTextStroke: "1px rgba(86,48,74,.34)" }}
              >
                Chicle
              </span>
            </span>
          </h1>
          <p className="relative z-20 mt-8 max-w-md text-lg leading-8 text-[#6f4d65]">
            Un vodka rosa, brillante y nostálgico para convertir cualquier
            previa en una vibra de caramelo premium.
          </p>
        </div>

        <div className="z-30 col-span-6 mt-12 grid gap-4 md:col-start-10 md:col-span-3 md:mt-auto md:pb-24">
          <div className="cloud-card rounded-[2.4rem] p-6">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#a06a91]">
              Mood líquido
            </p>
            <p className="display-serif mt-4 text-4xl font-black leading-none text-[#56304a]">
              {flavors[activeFlavor].label}
            </p>
            <p className="mt-4 text-sm leading-6 text-[#73556c]">
              Vidrio rosado, reflejos suaves y una botella que flota como si
              estuviera hecha de nube y chicle.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-30 grid min-h-[118vh] grid-cols-6 gap-y-16 px-6 py-28 sm:px-10 md:grid-cols-12 md:gap-x-8 md:px-14 lg:px-20">
        {editorialCards.map((card) => (
          <article
            key={card.kicker}
            data-editorial-card
            className={`cloud-card col-span-6 ${card.placement} rounded-[2.8rem] p-7 md:p-9`}
          >
            <p className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#a06a91]">
              {card.kicker}
            </p>
            <h2 className="display-serif mt-5 text-4xl font-black leading-[0.92] tracking-[-0.055em] text-[#56304a] md:text-6xl">
              {card.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#73556c]">
              {card.body}
            </p>
            <p className="mt-8 border-t border-pink-200/50 pt-4 text-[0.64rem] font-black uppercase tracking-[0.28em] text-[#a06a91]">
              {card.meta}
            </p>
          </article>
        ))}
      </section>

      <section className="relative z-10 flex min-h-screen items-end overflow-hidden px-6 py-32 sm:px-10 md:px-14 lg:px-20">
        <div
          data-marquee
          className="display-serif relative z-0 whitespace-nowrap text-[clamp(5rem,18vw,20rem)] font-black uppercase leading-none tracking-[-0.1em] text-pink-200/20 mix-blend-multiply"
        >
          Chicle Rosa / Uva Lila / Tsukerky Vodka / Bien frío /
        </div>
        <div className="cloud-card absolute bottom-28 left-6 z-20 max-w-xl rounded-[3rem] p-7 sm:left-10 md:left-14 lg:left-20">
          <p className="text-[0.64rem] font-black uppercase tracking-[0.34em] text-[#a06a91]">
            Nota final
          </p>
          <h2 className="display-serif mt-5 text-4xl font-black leading-[0.92] tracking-[-0.06em] text-[#56304a] md:text-6xl">
            Parece un anuncio de vodka que cayó dentro de una nube rosa.
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
      <div className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#7b5d73]/70 md:block">
        <p className="vertical-copy">30% ALC. VOL / 750 ML / 10 VECES FILTRADO</p>
      </div>
      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#7b5d73]/70 md:block">
        <p className="vertical-copy rotate-180">
          Rosa chicle / lila suave / blanco nube
        </p>
      </div>
      <div className="fixed left-6 top-5 z-40 font-mono text-[0.58rem] font-bold uppercase tracking-[0.24em] text-[#7b5d73]/70 sm:left-10 sm:top-8">
        Lote TSU-10
      </div>
      <div className="fixed right-6 top-5 z-40 text-right font-mono text-[0.58rem] font-bold uppercase tracking-[0.24em] text-[#7b5d73]/70 sm:right-10 sm:top-8">
        Sistema candy premium
      </div>
    </>
  );
}
