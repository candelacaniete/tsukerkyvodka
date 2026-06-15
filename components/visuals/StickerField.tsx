"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const stickers = [
  {
    copy: "100% SABOR TUTTI-FRUTTI",
    meta: "Antojo rosa / vibra brillante",
    className: "left-[7vw] top-[24vh] rotate-[-5deg]",
    depth: 7,
  },
  {
    copy: "FILTRADO EN EL ESPACIO",
    meta: "Suave, limpio, cero drama",
    className: "right-[8vw] top-[17vh] rotate-[6deg]",
    depth: -9,
  },
  {
    copy: "30% ALC. VOL",
    meta: "750 ML / bien frío",
    className: "left-[10vw] top-[70vh] rotate-[4deg]",
    depth: -6,
  },
  {
    copy: "RETROGUSTO NEÓN",
    meta: "Dulce, urbano, inesperado",
    className: "right-[10vw] top-[61vh] rotate-[-7deg]",
    depth: 8,
  },
  {
    copy: "BEBER BIEN FRÍO ✨",
    meta: "Regla de oro Tsukerky",
    className: "left-[36vw] top-[12vh] hidden rotate-[3deg] lg:block",
    depth: 5,
  },
];

export function StickerField() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const nodes = gsap.utils.toArray<HTMLElement>("[data-sticker]", root);
    const setters = nodes.map((node) => {
      const depth = Number(node.dataset.depth ?? 0);
      return {
        x: gsap.quickTo(node, "x", {
          duration: 0.8,
          ease: "power3.out",
        }),
        y: gsap.quickTo(node, "y", {
          duration: 0.8,
          ease: "power3.out",
        }),
        rotate: gsap.quickTo(node, "rotation", {
          duration: 1,
          ease: "power3.out",
        }),
        depth,
      };
    });

    const handlePointerMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;

      setters.forEach((setter) => {
        setter.x(nx * setter.depth * 1.35);
        setter.y(ny * setter.depth);
        setter.rotate(nx * setter.depth * 0.06);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[25] hidden overflow-hidden md:block"
      aria-hidden="true"
    >
      {stickers.map((sticker) => (
        <div
          key={sticker.copy}
          data-sticker
          data-depth={sticker.depth}
          className={`sticker absolute w-48 rounded-[2.1rem] px-5 py-4 ${sticker.className}`}
        >
          <p className="text-[0.56rem] font-black uppercase tracking-[0.34em] text-[#a06a91]">
            Mini ritual
          </p>
          <p className="display-serif mt-2 text-2xl font-black leading-none">
            {sticker.copy}
          </p>
          <p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.19em] text-[#8b6680]">
            {sticker.meta}
          </p>
        </div>
      ))}
    </div>
  );
}
