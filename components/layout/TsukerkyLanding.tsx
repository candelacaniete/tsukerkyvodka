"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BottleCanvas } from "@/components/visuals/BottleCanvas";

gsap.registerPlugin(ScrollTrigger);

type ProductKind =
  | "combo-ocean"
  | "combo-diamond"
  | "ocean"
  | "diamond"
  | "glow"
  | "purple-stickers";

const storeProducts: Array<{
  name: string;
  price: string;
  detail: string;
  kind: ProductKind;
}> = [
  {
    name: "Tsukerky Pink Candy + Vaso Ocean Pink",
    price: "$48.000,00",
    detail: "Combo demo con vaso de regalo. No procesa compra real.",
    kind: "combo-ocean",
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
    name: "Tsukerky Purple Candy + Stickers",
    price: "$48.000,00",
    detail: "Botella Purple Candy con pack de stickers demo.",
    kind: "purple-stickers",
  },
  {
    name: "Tsukerky Glow - Pink",
    price: "$5.300,00",
    detail: "Colorante en polvo rosa para sumar brillo a la previa.",
    kind: "glow",
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
            About Us
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
        </div>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {storeProducts.map((product) => (
            <article
              key={product.name}
              data-fade-in
              className="cloud-card relative z-40 min-h-[31rem] overflow-hidden rounded-[2rem] p-5"
            >
              <div className="absolute inset-x-5 top-5 h-64 overflow-hidden rounded-[1.45rem] bg-gradient-to-br from-white/80 via-sky-100/70 to-pink-100/70 shadow-xl shadow-pink-200/30">
                <ProductVisual kind={product.kind} />
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
        className="relative z-40 grid min-h-screen grid-cols-6 px-6 py-28 sm:px-10 md:grid-cols-12 md:gap-x-8 md:px-14 lg:px-20"
      >
        <div data-fade-in className="col-span-6 self-center md:col-span-12">
          <h2 className="display-serif max-w-5xl text-6xl font-black leading-[0.86] tracking-[-0.08em] text-[#56304a] md:text-8xl">
            Nacida en el club, inspirada en los caramelos.
          </h2>
        </div>
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
}: {
  kind: ProductKind;
}) {
  const showComboBottle = kind === "combo-ocean" || kind === "combo-diamond";
  const showOcean = kind === "ocean" || kind === "combo-ocean";
  const showDiamond = kind === "diamond" || kind === "combo-diamond";
  const showGlow = kind === "glow";
  const showPurpleStickers = kind === "purple-stickers";
  const cupPosition = showComboBottle ? "left-[36%]" : "left-1/2";

  return (
    <div className="relative h-full w-full">
      {showGlow ? (
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-200/55 via-pink-200/60 to-purple-200/40">
          <div className="absolute left-[34%] top-[45%] h-16 w-28 -translate-x-1/2 rounded-[50%] border border-[#56304a]/20 bg-gradient-to-b from-pink-200 to-fuchsia-300 shadow-xl shadow-pink-300/40" />
          <div className="absolute left-[34%] top-[50%] h-14 w-28 -translate-x-1/2 rounded-b-[1.8rem] border-x border-b border-[#56304a]/20 bg-pink-300/55" />
          <div className="absolute left-[61%] top-[43%] h-28 w-28 -translate-x-1/2 rounded-full bg-[#151019] shadow-2xl shadow-purple-300/50">
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#ff1493] via-[#c60072] to-[#8b275f]" />
            <div className="absolute inset-x-5 top-10 text-center text-sm font-black uppercase leading-none tracking-[-0.04em] text-[#151019]">
              Tsukerky
            </div>
            <div className="absolute inset-x-6 top-5 h-16 rounded-full border border-[#151019]/45" />
          </div>
          <div className="absolute bottom-8 left-1/2 h-8 w-36 -translate-x-1/2 rounded-[50%] bg-gradient-to-r from-pink-300 via-fuchsia-300 to-pink-200 blur-[1px]" />
          <div className="absolute bottom-9 left-1/2 h-4 w-28 -translate-x-1/2 rounded-[50%] bg-pink-300/80" />
          <div className="absolute bottom-10 left-[42%] h-2 w-2 rounded-full bg-fuchsia-300" />
          <div className="absolute bottom-12 left-[58%] h-1.5 w-1.5 rounded-full bg-pink-400" />
        </div>
      ) : null}

      {showPurpleStickers ? (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100/70 via-white/80 to-fuchsia-100/70">
          <StaticBottleIllustration className="left-1/2" variant="purple" />
          <StickerDot className="left-[20%] top-[18%] rotate-[-12deg]" copy="Y2K" />
          <StickerDot className="right-[14%] top-[22%] rotate-[10deg]" copy="UVA" />
          <StickerDot className="left-[18%] bottom-[18%] rotate-[8deg]" copy="POP" />
          <StickerDot className="right-[18%] bottom-[16%] rotate-[-8deg]" copy="GLAM" />
        </div>
      ) : null}

      {showComboBottle ? (
        <StaticBottleIllustration className="left-[66%]" variant="pink" />
      ) : null}

      {showOcean ? (
        <CupIllustration
          className={cupPosition}
          variant="ocean"
        />
      ) : null}

      {showDiamond ? (
        <CupIllustration
          className={cupPosition}
          variant="diamond"
        />
      ) : null}
    </div>
  );
}

function StaticBottleIllustration({
  className,
  variant,
}: {
  className: string;
  variant: "pink" | "purple";
}) {
  const isPurple = variant === "purple";

  return (
    <div className={`absolute top-8 h-48 w-20 -translate-x-1/2 ${className}`}>
      <div className="absolute left-1/2 top-0 h-8 w-9 -translate-x-1/2 rounded-t-xl bg-[#f5d9c2]" />
      <div className="absolute left-1/2 top-7 h-16 w-5 -translate-x-1/2 bg-white/55" />
      <div
        className={`absolute bottom-0 left-1/2 h-36 w-16 -translate-x-1/2 rounded-b-2xl rounded-t-lg border border-white/80 shadow-2xl shadow-pink-200/50 ${
          isPurple
            ? "bg-gradient-to-b from-violet-300 via-fuchsia-300 to-purple-400"
            : "bg-gradient-to-b from-fuchsia-300 via-fuchsia-400 to-pink-300"
        }`}
      />
      <div className="absolute bottom-12 left-1/2 h-14 w-12 -translate-x-1/2 rounded-md bg-white/75 shadow-md">
        <div
          className={`mx-auto mt-3 h-5 w-5 rounded-full border border-[#56304a]/60 ${
            isPurple ? "bg-lime-200" : "bg-pink-200"
          }`}
        />
      </div>
    </div>
  );
}

function StickerDot({ className, copy }: { className: string; copy: string }) {
  return (
    <div
      className={`absolute rounded-full border border-white/80 bg-white/65 px-3 py-2 text-[0.52rem] font-black uppercase tracking-[0.12em] text-[#8b3d87] shadow-lg shadow-violet-200/40 backdrop-blur ${className}`}
    >
      {copy}
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
  const isDiamond = variant === "diamond";

  return (
    <div
      className={`absolute top-9 h-44 w-20 -translate-x-1/2 overflow-hidden border border-white/80 shadow-2xl shadow-pink-200/40 ${className} ${
        isDiamond
          ? "rounded-b-[1.35rem] rounded-t-[0.7rem] bg-gradient-to-b from-white via-white to-pink-300"
          : "rounded-b-[1.7rem] rounded-t-xl bg-gradient-to-b from-pink-200 via-sky-200 to-cyan-200"
      }`}
      style={
        isDiamond
          ? { clipPath: "polygon(12% 0, 88% 0, 78% 100%, 22% 100%)" }
          : undefined
      }
    >
      {variant === "ocean" ? (
        <div className="absolute inset-0 opacity-60">
          {Array.from({ length: 7 }).map((_, row) =>
            Array.from({ length: 4 }).map((__, col) => (
              <span
                key={`${row}-${col}`}
                className="absolute h-8 w-9 rounded-b-full border-x border-b border-white/70 bg-white/10"
                style={{
                  left: `${col * 1.35 - (row % 2) * 0.66}rem`,
                  top: `${row * 1.28}rem`,
                }}
              />
            )),
          )}
        </div>
      ) : null}
      {isDiamond ? (
        <div className="absolute inset-0 opacity-45">
          {Array.from({ length: 9 }).map((_, row) =>
            Array.from({ length: 5 }).map((__, col) => (
              <span
                key={`${row}-${col}`}
                className="absolute h-4 w-4 rotate-45 border border-[#cfc7d8]/70 bg-white/30"
                style={{
                  left: `${col * 1.05 - 0.1}rem`,
                  top: `${row * 1.05}rem`,
                }}
              />
            )),
          )}
        </div>
      ) : null}
      <div
        className={`absolute -top-1 left-1/2 h-7 w-20 -translate-x-1/2 rounded-t-xl ${
          isDiamond ? "bg-[#ff6f9f]" : "bg-[#3d3448]/75"
        }`}
      />
      <div
        className={`absolute left-1/2 top-0 h-32 w-1 -translate-x-1/2 -translate-y-10 ${
          isDiamond ? "bg-[#ff4f88]" : "bg-white/75"
        }`}
      />
      <div className="absolute left-1/2 top-14 h-11 w-11 -translate-x-1/2 rounded-full border-2 border-[#56304a]/60 bg-white/60">
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-300 via-pink-400 to-fuchsia-500" />
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </div>
    </div>
  );
}
