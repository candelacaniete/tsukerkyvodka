"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BottleCanvas } from "@/components/visuals/BottleCanvas";

gsap.registerPlugin(ScrollTrigger);

type ProductKind = "combo-ocean" | "combo-diamond" | "ocean" | "diamond" | "glow";

const storeProducts: Array<{
  name: string;
  price: string;
  detail: string;
  kind: ProductKind;
  usesBottle?: boolean;
}> = [
  {
    name: "Tsukerky Pink Candy + Vaso Ocean Pink",
    price: "$48.000,00",
    detail: "Combo demo con vaso de regalo. No procesa compra real.",
    kind: "combo-ocean",
    usesBottle: true,
  },
  {
    name: "Vaso Tsukerky Ocean Pink",
    price: "$29.000,00",
    detail: "Vaso perlado con textura oceánica rosa pastel.",
    kind: "ocean",
  },
  {
    name: "Vaso Tsukerky Diamond Pink",
    price: "$29.000,00",
    detail: "Vaso rosa con tapa y textura diamond Y2K.",
    kind: "diamond",
  },
  {
    name: "Tsukerky Pink Candy + Vaso Diamond Pink",
    price: "$48.000,00",
    detail: "Combo demo con vaso diamond incluido.",
    kind: "combo-diamond",
  },
  {
    name: "Tsukerky Glow - Purple",
    price: "$5.300,00",
    detail: "Glow purple para sumar brillo a la previa.",
    kind: "glow",
  },
];

const storyTiles = [
  {
    kicker: "01 / Origen",
    title: "Nacida en el club.",
    body: "Tsukerky aparece cuando la noche empieza a ponerse rara: vasos fríos, luces suaves y una playlist que nadie quiere apagar.",
    className: "md:col-start-2 md:col-span-4 md:row-start-1",
  },
  {
    kicker: "02 / Recuerdo",
    title: "Inspirada en los caramelos.",
    body: "Ese sabor de kiosco, chicle y bolsa de golosinas convertido en un objeto premium para mirar, servir y compartir.",
    className: "md:col-start-7 md:col-span-5 md:row-start-1 md:mt-24",
  },
  {
    kicker: "03 / Actitud",
    title: "Dulce, urbana, cero obvia.",
    body: "No busca parecer seria: busca verse inolvidable. Rosa pastel, vidrio helado y una presencia que se queda en la foto.",
    className: "md:col-start-4 md:col-span-5 md:row-start-2",
  },
];

export function TsukerkyLanding() {
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

      gsap.utils.toArray<HTMLElement>("[data-fade-in]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 64, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 78%",
              end: "top 45%",
              scrub: 1,
            },
          },
        );
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <main data-scroll-story className="editorial-shell overflow-hidden">
      <BottleCanvas flavor="pink" />
      <CloudLayer />
      <div className="noise" aria-hidden="true" />

      <section
        data-section="hero"
        className="relative z-30 grid min-h-screen grid-cols-6 px-6 pb-32 pt-8 sm:px-10 md:grid-cols-12 md:gap-x-8 md:px-14 lg:px-20"
      >
        <div className="col-span-6 flex min-h-[68vh] items-center md:col-span-12">
          <h1
            className="display-serif relative z-10 grid w-full grid-cols-[minmax(0,1fr)_minmax(6rem,24vw)_minmax(0,1fr)] grid-rows-2 items-center gap-x-3 gap-y-8 font-black uppercase leading-[0.78] tracking-[-0.1em] text-[#56304a] sm:gap-x-6 md:gap-x-10"
            style={{ fontSize: "clamp(3.25rem, 10.5vw, 12.5rem)" }}
          >
            <span className="block overflow-visible py-2 text-right">
              <span data-hero-word className="block">
                Tsuk
              </span>
            </span>
            <span aria-hidden="true" className="block" />
            <span className="block overflow-visible py-2 text-left">
              <span data-hero-word className="block">
                Erky
              </span>
            </span>
            <span className="block overflow-visible py-2 text-right">
              <span
                data-hero-word
                className="block text-transparent"
                style={{ WebkitTextStroke: "1px rgba(86,48,74,.34)" }}
              >
                Vod
              </span>
            </span>
            <span aria-hidden="true" className="block" />
            <span className="block overflow-visible py-2 text-left">
              <span
                data-hero-word
                className="block text-transparent"
                style={{ WebkitTextStroke: "1px rgba(86,48,74,.34)" }}
              >
                Ka
              </span>
            </span>
          </h1>
        </div>

      </section>

      <section
        data-section="manifesto"
        className="relative z-40 grid min-h-screen grid-cols-6 items-center px-6 py-28 sm:px-10 md:grid-cols-12 md:gap-x-8 md:px-14 lg:px-20"
      >
        <article
          data-fade-in
          className="cloud-card col-span-6 max-w-2xl rounded-[3rem] p-7 md:col-start-2 md:col-span-5 md:p-10"
        >
          <h2 className="display-serif text-5xl font-black leading-[0.9] tracking-[-0.06em] text-[#56304a] md:text-7xl">
            Texto de manifiesto demo.
          </h2>
          <p className="mt-7 text-lg leading-8 text-[#73556c]">
            Tsukerky no nació para quedarse quieta. Nació para mezclar
            nostalgia, caramelo, estética de foto y una actitud que prende la
            previa antes del primer hielo.
          </p>
          <p className="mt-6 text-base leading-7 text-[#8b6680]">
            Es vodka con memoria de kiosco, vidrio rosado y una dulzura urbana:
            suave cuando entra, brillante cuando aparece.
          </p>
        </article>
      </section>

      <section
        data-section="products"
        className="relative z-40 min-h-screen px-6 py-28 sm:px-10 md:px-14 lg:px-20"
      >
        <div data-fade-in className="mx-auto max-w-5xl text-center">
          <h2 className="display-serif text-5xl font-black leading-[0.9] tracking-[-0.06em] text-[#56304a] md:text-7xl">
            Tienda demo para armar tu ritual frío.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#73556c]">
            Catálogo visual no funcional: los botones no procesan compras, solo
            muestran cómo se vería la experiencia online de Tsukerky.
          </p>
        </div>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {storeProducts.map((product) => (
            <article
              key={product.name}
              data-fade-in
              data-bottle-card={product.usesBottle ? "true" : undefined}
              className={`cloud-card relative min-h-[31rem] overflow-hidden rounded-[2rem] p-5 ${
                product.usesBottle ? "z-[44]" : "z-40"
              }`}
            >
              <div className="absolute inset-x-5 top-5 h-64 overflow-hidden rounded-[1.45rem] bg-gradient-to-br from-white/80 via-sky-100/70 to-pink-100/70 shadow-xl shadow-pink-200/30">
                <ProductVisual kind={product.kind} usesBottle={product.usesBottle} />
              </div>
              <div className="relative z-[60] mt-72">
                <h3 className="min-h-16 text-lg font-black leading-tight text-[#ff1493]">
                  {product.name}
                </h3>
                <p className="mt-3 text-xl font-black text-[#ff1493]">
                  {product.price}
                </p>
                <p className="mt-3 min-h-12 text-sm leading-6 text-[#73556c]">
                  {product.detail}
                </p>
                <button
                  type="button"
                  disabled
                  className="mt-5 w-full cursor-not-allowed rounded-full border border-[#a998e8]/60 bg-white/30 px-5 py-3 text-sm font-black text-[#a998e8] opacity-80"
                >
                  Comprar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        data-section="history"
        className="relative z-40 grid min-h-[125vh] grid-cols-6 gap-y-10 px-6 py-28 sm:px-10 md:grid-cols-12 md:gap-x-8 md:px-14 lg:px-20"
      >
        <div data-fade-in className="col-span-6 md:col-span-12">
          <h2 className="display-serif max-w-5xl text-6xl font-black leading-[0.86] tracking-[-0.08em] text-[#56304a] md:text-8xl">
            Nacida en el club, inspirada en los caramelos.
          </h2>
        </div>

        {storyTiles.map((tile) => (
          <article
            key={tile.kicker}
            data-fade-in
            className={`cloud-card ${tile.className} col-span-6 rounded-[3rem] p-7 md:p-9`}
          >
            <div className="mb-8 h-56 rounded-[2.4rem] bg-gradient-to-br from-white/80 via-pink-100/70 to-violet-100/80 shadow-xl shadow-pink-200/30" />
            <h3 className="display-serif text-4xl font-black leading-[0.92] tracking-[-0.055em] text-[#56304a] md:text-5xl">
              {tile.title}
            </h3>
            <p className="mt-5 text-base leading-7 text-[#73556c]">
              {tile.body}
            </p>
          </article>
        ))}
      </section>

      <footer className="relative z-40 px-6 pb-10 pt-28 sm:px-10 md:px-14 lg:px-20">
        <div className="cloud-card rounded-[3rem] p-7 md:p-10">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="display-serif text-5xl font-black uppercase leading-[0.85] tracking-[-0.08em] text-[#56304a] md:text-8xl">
                Tsukerky Vodka
              </p>
            </div>
            <nav className="flex flex-wrap gap-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#73556c]">
              <a className="rounded-full bg-white/45 px-4 py-3" href="mailto:hola@tsukerky.com">
                Contacto
              </a>
              <a className="rounded-full bg-white/45 px-4 py-3" href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a className="rounded-full bg-white/45 px-4 py-3" href="https://behance.net" target="_blank" rel="noreferrer">
                Behance
              </a>
            </nav>
          </div>
        </div>
      </footer>

    </main>
  );
}

function CloudLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[3] overflow-hidden opacity-50"
    >
      <div className="floating-cloud left-[4vw] top-[14vh] h-36 w-72" />
      <div className="floating-cloud right-[5vw] top-[26vh] h-28 w-60 [animation-delay:-5s]" />
      <div className="floating-cloud left-[18vw] top-[72vh] h-24 w-56 [animation-delay:-9s]" />
      <div className="floating-cloud right-[18vw] top-[76vh] h-32 w-72 [animation-delay:-13s]" />
    </div>
  );
}

function ProductVisual({
  kind,
  usesBottle,
}: {
  kind: ProductKind;
  usesBottle?: boolean;
}) {
  const showOcean = kind === "ocean" || kind === "combo-ocean";
  const showDiamond = kind === "diamond" || kind === "combo-diamond";
  const showGlow = kind === "glow";

  return (
    <div className="relative h-full w-full">
      {showGlow ? (
        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-fuchsia-300 via-purple-300 to-violet-500 shadow-2xl shadow-purple-300/50">
          <div className="absolute inset-5 rounded-full border border-[#56304a]/40 bg-white/30" />
          <div className="absolute inset-x-2 top-10 text-center text-[0.48rem] font-black uppercase tracking-[0.12em] text-[#56304a]">
            Tsukerky
          </div>
        </div>
      ) : null}

      {showOcean ? (
        <CupIllustration
          className={usesBottle ? "left-[58%]" : "left-1/2"}
          variant="ocean"
        />
      ) : null}

      {showDiamond ? (
        <CupIllustration
          className={usesBottle ? "left-[58%]" : "left-1/2"}
          variant="diamond"
        />
      ) : null}
    </div>
  );
}

function CupIllustration({
  className,
  variant,
}: {
  className: string;
  variant: "ocean" | "diamond";
}) {
  return (
    <div
      className={`absolute top-9 h-44 w-20 -translate-x-1/2 rounded-b-[1.7rem] rounded-t-xl border border-white/80 shadow-2xl shadow-pink-200/40 ${className} ${
        variant === "ocean"
          ? "bg-gradient-to-b from-pink-200 via-sky-200 to-cyan-200"
          : "bg-gradient-to-b from-pink-300 via-pink-200 to-pink-100"
      }`}
    >
      <div className="absolute -top-5 left-1/2 h-7 w-14 -translate-x-1/2 rounded-t-xl bg-white/90" />
      <div className="absolute -top-8 left-1/2 h-12 w-1 -translate-x-1/2 bg-pink-400" />
      <div className="absolute left-1/2 top-14 h-11 w-11 -translate-x-1/2 rounded-full border-2 border-[#56304a]/60 bg-white/50" />
    </div>
  );
}
