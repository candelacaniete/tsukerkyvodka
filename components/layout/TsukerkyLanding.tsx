"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BottleCanvas } from "@/components/visuals/BottleCanvas";

gsap.registerPlugin(ScrollTrigger);

const productVariants = [
  {
    name: "Chicle Rosa",
    note: "Tutti-frutti",
    detail: "La original. Dulce, limpia y lista para hielo.",
    swatch: "from-pink-200 via-white to-pink-100",
  },
  {
    name: "Uva Lila",
    note: "Uva pastel",
    detail: "Un toque violeta, suave y fotogénico.",
    swatch: "from-violet-200 via-white to-fuchsia-100",
  },
  {
    name: "Nube Blanca",
    note: "Vainilla fría",
    detail: "Cremosa, ligera y con vibra de cierre suave.",
    swatch: "from-white via-pink-50 to-violet-100",
  },
  {
    name: "Brillo Pop",
    note: "Caramelo ácido",
    detail: "Más atrevida, más eléctrica, misma base limpia.",
    swatch: "from-rose-200 via-orange-100 to-white",
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
      <div className="noise" aria-hidden="true" />

      <section
        data-section="hero"
        className="relative z-30 grid min-h-screen grid-cols-6 px-6 pb-32 pt-8 sm:px-10 md:grid-cols-12 md:gap-x-8 md:px-14 lg:px-20"
      >
        <div className="col-span-6 mt-20 md:col-span-12 md:mt-24">
          <h1
            className="display-serif relative z-10 max-w-[9ch] font-black uppercase leading-[0.76] tracking-[-0.11em] text-[#56304a] md:max-w-none"
            style={{ fontSize: "clamp(4.7rem, 13.5vw, 15rem)" }}
          >
            <span className="block overflow-hidden">
              <span data-hero-word className="block">
                Tsukerky
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-hero-word
                className="block text-transparent"
                style={{ WebkitTextStroke: "1px rgba(86,48,74,.34)" }}
              >
                Vodka
              </span>
            </span>
          </h1>
        </div>

        <div className="z-40 col-span-6 mt-auto grid gap-4 md:col-start-2 md:col-span-3 md:pb-16">
          <div className="cloud-card rounded-[2.4rem] p-6">
            <p className="display-serif text-3xl font-black leading-none text-[#56304a]">
              Chicle Rosa
            </p>
            <p className="mt-4 text-sm leading-6 text-[#73556c]">
              Una botella grande, flotando en el centro, como un caramelo que
              decidió volverse premium.
            </p>
          </div>
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
        <div data-fade-in className="mx-auto max-w-4xl text-center">
          <h2 className="display-serif text-5xl font-black leading-[0.9] tracking-[-0.06em] text-[#56304a] md:text-7xl">
            Una fila de sabores para armar tu ritual frío.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#73556c]">
            La botella 3D se encoge y se integra como primer producto. Las
            variantes completan la familia con vidrio translúcido y pegatinas
            de caramelo.
          </p>
        </div>

        <div className="mt-24 grid gap-5 md:grid-cols-4">
          {productVariants.map((product, index) => (
            <article
              key={product.name}
              data-fade-in
              data-bottle-card={index === 0 ? "true" : undefined}
              className="cloud-card relative min-h-[28rem] overflow-hidden rounded-[3rem] p-6"
            >
              <div
                className={`absolute inset-x-6 top-7 h-52 rounded-[2.4rem] shadow-xl shadow-pink-200/30 ${
                  index === 0
                    ? "border border-dashed border-pink-300/70 bg-white/15"
                    : `bg-gradient-to-br ${product.swatch}`
                }`}
              />
              {index === 0 ? (
                <div className="absolute inset-x-8 top-12 h-64 rounded-[2rem] border border-dashed border-pink-300/60 bg-white/10" />
              ) : (
                <div className="absolute left-1/2 top-12 h-64 w-24 -translate-x-1/2 rounded-[2rem] border border-white/80 bg-white/45 shadow-2xl shadow-pink-200/40 backdrop-blur-xl">
                  <div className="mx-auto mt-4 h-10 w-16 rounded-t-2xl bg-[#e9c8ad]" />
                  <div className="mx-auto mt-8 h-28 w-16 rounded-2xl bg-white/65" />
                </div>
              )}
              <div className="relative z-10 mt-72">
                {index === 0 ? (
                  <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.24em] text-[#a06a91]">
                    Producto real 3D
                  </p>
                ) : null}
                <h3 className="display-serif mt-3 text-4xl font-black leading-none tracking-[-0.05em] text-[#56304a]">
                  {product.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#73556c]">
                  {product.detail}
                </p>
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
