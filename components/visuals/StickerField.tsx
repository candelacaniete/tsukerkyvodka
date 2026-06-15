"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const stickers = [
  {
    copy: "TEN TIMES FILTERED",
    meta: "Clean hit / loud night",
    className: "left-[5vw] top-[22vh] rotate-[-7deg]",
    depth: 16,
  },
  {
    copy: "CANDYCORE",
    meta: "Club nostalgia",
    className: "right-[7vw] top-[16vh] rotate-[9deg]",
    depth: -22,
  },
  {
    copy: "30% ALC. VOL",
    meta: "750 ML",
    className: "left-[12vw] top-[66vh] rotate-[5deg]",
    depth: -14,
  },
  {
    copy: "NEON AFTERTASTE",
    meta: "Pink light / violet bass",
    className: "right-[11vw] top-[58vh] rotate-[-11deg]",
    depth: 20,
  },
  {
    copy: "URBAN SWEETNESS",
    meta: "Made with vodka",
    className: "left-[35vw] top-[10vh] hidden rotate-[4deg] lg:block",
    depth: 10,
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
        setter.x(nx * setter.depth * 2.3);
        setter.y(ny * setter.depth * 1.7);
        setter.rotate(nx * setter.depth * 0.12);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-30 hidden overflow-hidden md:block"
      aria-hidden="true"
    >
      {stickers.map((sticker) => (
        <div
          key={sticker.copy}
          data-sticker
          data-depth={sticker.depth}
          className={`sticker absolute w-44 rounded-[1.7rem] px-5 py-4 text-white ${sticker.className}`}
        >
          <p className="text-[0.56rem] font-black uppercase tracking-[0.34em] text-white/55">
            Tsukerky drop
          </p>
          <p className="display-serif mt-2 text-2xl font-black leading-none">
            {sticker.copy}
          </p>
          <p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.19em] text-white/58">
            {sticker.meta}
          </p>
        </div>
      ))}
    </div>
  );
}
