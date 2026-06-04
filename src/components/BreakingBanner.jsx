import React from "react";
import { useLang } from "../context/LanguageContext";

export default function BreakingBanner() {
  const { t } = useLang();

  return (
    <div className="bg-wine text-white flex items-center overflow-hidden h-8 sm:h-10">
      {/* Label */}
      <div className="bg-pink px-2 sm:px-3 md:px-4 h-full flex items-center flex-shrink-0
                      font-mono font-bold tracking-wider text-[10px] sm:text-xs whitespace-nowrap">
        {t.hero.breaking}
      </div>

      {/* Ticker */}
      <div className="overflow-hidden flex-1 relative">
        <div className="flex whitespace-nowrap animate-marquee gap-6 sm:gap-8 md:gap-12 px-3 sm:px-4 md:px-6 font-arabic text-[11px] sm:text-sm">
          {[...t.breaking.items, ...t.breaking.items].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gold flex-shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-none">{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}