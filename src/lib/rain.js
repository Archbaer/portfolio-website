export function shouldAnimate(prefersReduced) {
  return !prefersReduced;
}

export function nextDrops(drops, columns, height, fontSize) {
  return drops.map((y) => (y > height ? -Math.floor(Math.random() * height) : y + fontSize));
}
