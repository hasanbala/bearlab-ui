export const getLineWidth = (seed: number, min: number, range: number) =>
  `${min + (((seed * 37 + 11) % 100) / 100) * range}%`;
