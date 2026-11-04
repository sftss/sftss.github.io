import assert from 'node:assert/strict';
import { test } from 'node:test';
import { depthAt, formatDepth, MAX_DEPTH, zoneAt } from './depth.ts';

test('la profondeur va de la surface au fond, sans sortir des bornes', () => {
  assert.equal(depthAt(0), 0);
  assert.equal(depthAt(1), MAX_DEPTH);
  assert.equal(depthAt(-0.2), 0);
  assert.equal(depthAt(1.3), MAX_DEPTH);
  assert.equal(depthAt(Number.NaN), 0);
});

test('la profondeur croît et reste arrondie à 10 m', () => {
  let previous = -1;
  for (let p = 0; p <= 1; p += 0.01) {
    const depth = depthAt(p);
    assert.ok(depth >= previous);
    assert.equal(depth % 10, 0);
    previous = depth;
  }
  // Courbe quadratique : à mi-page, on n'est qu'au quart de la profondeur.
  assert.equal(depthAt(0.5), MAX_DEPTH / 4);
});

test('chaque profondeur tombe dans sa zone pélagique', () => {
  assert.equal(zoneAt(0), 'epipelagic');
  assert.equal(zoneAt(199), 'epipelagic');
  assert.equal(zoneAt(200), 'mesopelagic');
  assert.equal(zoneAt(1000), 'bathypelagic');
  assert.equal(zoneAt(3990), 'bathypelagic');
  assert.equal(zoneAt(MAX_DEPTH), 'abyssopelagic');
});

test('la profondeur s’affiche avec le signe moins et l’unité', () => {
  assert.equal(formatDepth(0, 'fr'), '0 m');
  assert.equal(formatDepth(1240, 'en'), '−1,240 m');
  // En français, Intl sépare les milliers par une espace fine insécable.
  assert.equal(formatDepth(1240, 'fr'), '−1 240 m');
});
