import path from 'node:path';
import sharp from 'sharp';

// Du plus clair au plus dense : sur fond sombre, les zones sombres de la photo deviennent les plus denses.
const RAMP = ' .:-=+*%#@';

export interface AsciiOptions {
  cols: number;
  /** Seuil sous lequel une zone claire (le fond gris, la chemise) devient vide. */
  threshold: number;
  gamma: number;
}

export async function asciiPortrait({ cols, threshold, gamma }: AsciiOptions) {
  const file = path.join(process.cwd(), 'public/assets/img/pp.webp');
  // Cadrage sur la tête et les épaules.
  const crop = { left: 150, top: 250, width: 600, height: 640 };
  // Un caractère mono fait environ 0,6 fois sa hauteur en largeur, avec un interligne de 1.
  const rows = Math.round(cols * (crop.height / crop.width) * 0.6);
  const { data } = await sharp(file)
    .extract(crop)
    .resize(cols, rows, { fit: 'fill' })
    .grayscale()
    .normalise()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const lines: string[] = [];
  for (let y = 0; y < rows; y++) {
    let line = '';
    for (let x = 0; x < cols; x++) {
      const darkness = 1 - data[y * cols + x] / 255;
      if (darkness < threshold) {
        line += ' ';
        continue;
      }
      const level = Math.pow((darkness - threshold) / (1 - threshold), gamma);
      line += RAMP[Math.min(RAMP.length - 1, 1 + Math.round(level * (RAMP.length - 2)))];
    }
    lines.push(line.trimEnd());
  }
  return lines;
}

/** Réseau de neurones en ASCII, à la taille de la grille du portrait. */
export function asciiNetwork(cols: number, rows: number) {
  const grid = Array.from({ length: rows }, () => Array<string>(cols).fill(' '));
  const layers = [4, 6, 6, 3];
  const columns = [0.12, 0.38, 0.62, 0.88].map((f) => Math.round(f * (cols - 1)));
  const spacing = (rows * 0.82) / Math.max(...layers);
  const nodes = layers.map((count, layer) =>
    Array.from({ length: count }, (_, i) => ({
      x: columns[layer],
      y: Math.round(rows / 2 + (i - (count - 1) / 2) * spacing),
    })),
  );

  // Connexions en pointillés : légères, elles laissent ressortir les nœuds même quand elles se croisent.
  for (let layer = 0; layer < nodes.length - 1; layer++) {
    for (const a of nodes[layer]) {
      for (const b of nodes[layer + 1]) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const steps = Math.ceil(Math.max(Math.abs(dx), Math.abs(dy)));
        for (let s = 0; s <= steps; s += 2) {
          const x = Math.round(a.x + (dx * s) / steps);
          const y = Math.round(a.y + (dy * s) / steps);
          if (grid[y]?.[x] === ' ') grid[y][x] = '.';
        }
      }
    }
  }

  // Les nœuds, des disques pleins, recouvrent les connexions.
  for (const node of nodes.flat()) {
    for (let y = node.y - 3; y <= node.y + 3; y++) {
      for (let x = node.x - 6; x <= node.x + 6; x++) {
        const d = ((x - node.x) / 5.2) ** 2 + ((y - node.y) / 2.7) ** 2;
        if (d <= 1 && grid[y]?.[x] !== undefined) grid[y][x] = d < 0.35 ? '@' : d < 0.75 ? '%' : '*';
      }
    }
  }
  return grid.map((row) => row.join(''));
}
