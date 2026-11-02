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
