export function HeroArcs() {
  const rings = [
    { rx: 640, ry: 640, rot: 0, d: 0 },
    { rx: 600, ry: 600, rot: 0, d: 1 },
    { rx: 520, ry: 440, rot: 12, d: 2 },
    { rx: 430, ry: 380, rot: -18, d: 3 },
    { rx: 340, ry: 250, rot: 28, d: 4 },
    { rx: 250, ry: 170, rot: -34, d: 5 }
  ];
  return (
    <svg className="hero-arcs" viewBox="-700 -700 1400 1400" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g stroke="#9a9a9a" strokeWidth="1.1" opacity=".55">
        {rings.map((r) => (
          <ellipse key={r.d} className="hero-arcs__ring" style={{ animationDelay: `${-r.d * 4}s` }} rx={r.rx} ry={r.ry} transform={`rotate(${r.rot})`} />
        ))}
      </g>
    </svg>
  );
}
