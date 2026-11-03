/** Adaptation: where each character of a shark's label lands on the cell grid. */
export interface LabelCell {
  col: number;
  row: number;
  char: string;
}

/**
 * Centres `text` on the cell under (x, y), always upright: the label rides the body
 * but never rotates with it, so it stays readable however the shark turns.
 * Cells outside the grid are dropped.
 */
export function labelCells(x: number, y: number, cw: number, ch: number, cols: number, rows: number, text: string) {
  const row = Math.floor(y / ch);
  const first = Math.floor(x / cw - text.length / 2 + 0.5);
  const cells: LabelCell[] = [];
  if (row < 0 || row >= rows) return cells;
  for (let i = 0; i < text.length; i++) {
    const col = first + i;
    if (col >= 0 && col < cols) cells.push({ col, row, char: text[i] });
  }
  return cells;
}
