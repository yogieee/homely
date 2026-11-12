type OrnateFrameProps = {
  tone?: "brass" | "ivory";
};

function Corner({ tone }: { tone: "brass" | "ivory" }) {
  const stroke = tone === "brass" ? "#B08A5E" : "#F5E4CD";
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <path
        d="M2 44V18C2 9 9 2 18 2H44"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path d="M2 30V22C2 14 14 2 22 2H30" stroke={stroke} strokeWidth="1" opacity="0.6" />
      <circle cx="2" cy="44" r="3" fill={stroke} />
    </svg>
  );
}

export default function OrnateFrame({ tone = "brass" }: OrnateFrameProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="absolute -top-px -left-px">
        <Corner tone={tone} />
      </div>
      <div className="absolute -top-px -right-px rotate-90">
        <Corner tone={tone} />
      </div>
      <div className="absolute -bottom-px -right-px rotate-180">
        <Corner tone={tone} />
      </div>
      <div className="absolute -bottom-px -left-px -rotate-90">
        <Corner tone={tone} />
      </div>
    </div>
  );
}
