export type RGB = { r: number; g: number; b: number };

export function rgbToHex({ r, g, b }: RGB): string {
  return `#${[r, g, b].map((channel) => Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

export function rgbToHsl({ r, g, b }: RGB): { h: number; s: number; l: number } {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === red) h = ((green - blue) / delta) % 6;
    else if (max === green) h = (blue - red) / delta + 2;
    else h = (red - green) / delta + 4;
    h = (h * 60 + 360) % 360;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function distanceSquared(a: RGB, b: RGB): number {
  return (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2;
}

export function extractDominantColors(pixels: Uint8ClampedArray, count = 5): RGB[] {
  const bins = new Map<number, { r: number; g: number; b: number; n: number }>();
  for (let i = 0; i + 3 < pixels.length; i += 4) {
    const alpha = pixels[i + 3];
    if (alpha < 96) continue;
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
    const entry = bins.get(key);
    if (entry) { entry.r += r; entry.g += g; entry.b += b; entry.n += 1; }
    else bins.set(key, { r, g, b, n: 1 });
  }
  const candidates = [...bins.values()]
    .map((entry) => ({ r: entry.r / entry.n, g: entry.g / entry.n, b: entry.b / entry.n, n: entry.n }))
    .sort((a, b) => b.n - a.n);
  if (!candidates.length) throw new Error("This image has no readable pixels.");

  const centroids: RGB[] = [];
  for (const candidate of candidates) {
    const color = { r: candidate.r, g: candidate.g, b: candidate.b };
    if (centroids.every((current) => distanceSquared(current, color) > 1600)) centroids.push(color);
    if (centroids.length === count) break;
  }
  for (let i = 0; centroids.length < count; i += 1) {
    const candidate = candidates[Math.min(candidates.length - 1, Math.floor((i + 1) * candidates.length / (count + 1)))];
    centroids.push({ r: candidate.r, g: candidate.g, b: candidate.b });
  }

  for (let iteration = 0; iteration < 12; iteration += 1) {
    const sums = Array.from({ length: count }, () => ({ r: 0, g: 0, b: 0, n: 0 }));
    for (const candidate of candidates) {
      let nearest = 0;
      for (let i = 1; i < centroids.length; i += 1) {
        if (distanceSquared(candidate, centroids[i]) < distanceSquared(candidate, centroids[nearest])) nearest = i;
      }
      const weight = Math.sqrt(candidate.n);
      sums[nearest].r += candidate.r * weight;
      sums[nearest].g += candidate.g * weight;
      sums[nearest].b += candidate.b * weight;
      sums[nearest].n += weight;
    }
    centroids.forEach((centroid, index) => {
      const sum = sums[index];
      if (sum.n > 0) centroids[index] = { r: sum.r / sum.n, g: sum.g / sum.n, b: sum.b / sum.n };
    });
  }
  return centroids.slice(0, count).map(({ r, g, b }) => ({ r: Math.round(r), g: Math.round(g), b: Math.round(b) }));
}
