import assert from 'node:assert/strict';
import { test } from 'node:test';
import { labelCells } from './label.ts';

test('le texte est centré sur la cellule visée', () => {
  const cells = labelCells(105, 50, 10, 15, 100, 40, '404');
  assert.deepEqual(
    cells.map((c) => [c.col, c.row, c.char]),
    [
      [9, 3, '4'],
      [10, 3, '0'],
      [11, 3, '4'],
    ],
  );
});

test('les caractères hors de la grille sont ignorés', () => {
  const left = labelCells(0, 10, 10, 15, 100, 40, '404');
  assert.deepEqual(
    left.map((c) => c.col),
    [0, 1],
  );
  const right = labelCells(995, 10, 10, 15, 100, 40, '404');
  assert.deepEqual(
    right.map((c) => c.col),
    [98, 99],
  );
});

test('une ligne hors de la grille ne donne aucune cellule', () => {
  assert.equal(labelCells(100, -5, 10, 15, 100, 40, '404').length, 0);
  assert.equal(labelCells(100, 700, 10, 15, 100, 40, '404').length, 0);
});
