"use client";

import type { FlavorId } from "@/components/visuals/flavor";
import { flavors } from "@/components/visuals/flavor";

type FlavorControlsProps = {
  activeFlavor: FlavorId;
  onFlavorChange: (flavor: FlavorId) => void;
};

export function FlavorControls({
  activeFlavor,
  onFlavorChange,
}: FlavorControlsProps) {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex w-[min(92vw,34rem)] -translate-x-1/2 gap-3 sm:bottom-8">
      {(Object.keys(flavors) as FlavorId[]).map((id) => {
        const flavor = flavors[id];
        const isActive = activeFlavor === id;

        return (
          <button
            key={flavor.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onFlavorChange(id)}
            className="flavor-button group flex flex-1 items-center justify-between rounded-full px-4 py-3 text-left text-white transition duration-300 hover:-translate-y-1 sm:px-5"
          >
            <span className="relative z-10">
              <span className="block text-[0.66rem] font-black uppercase tracking-[0.28em] text-white/55">
                Taste switch
              </span>
              <span className="display-serif mt-1 block text-xl font-black leading-none sm:text-2xl">
                {flavor.label}
              </span>
            </span>
            <span className="relative z-10 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.63rem] font-black uppercase tracking-[0.22em] text-white/70">
              {flavor.note}
            </span>
          </button>
        );
      })}
    </div>
  );
}
