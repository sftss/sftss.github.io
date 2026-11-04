import assert from 'node:assert/strict';
import { test } from 'node:test';
import { TROPICAL } from './species.ts';
import { World } from './world.ts';

const STEP = 1 / 60;

test('sans traversée, le monde n’est jamais terminé', () => {
  const world = new World(undefined, { fishCount: 20 });
  world.resize(1200, 800, 10, 15);
  for (let t = 0; t < 5; t += STEP) world.step(STEP);
  assert.equal(world.fish.length, 20);
  assert.equal(world.done, false);
});

for (const dir of [1, -1] as const) {
  test(`un requin seul traverse l’écran dans le sens ${dir}`, () => {
    const world = new World([{ kind: 'classic', size: 1 }], { fishCount: 0, crossing: { dir, duration: 10 } });
    world.resize(1400, 300, 11, 16);
    assert.equal(world.fish.length, 0);
    assert.equal(world.sharks.length, 1);
    const shark = world.sharks[0];
    // Départ entièrement hors de l'écran, du côté d'entrée.
    for (let k = 0; k < shark.nodes.length; k += 2) {
      assert.ok(dir === 1 ? shark.nodes[k] <= 0 : shark.nodes[k] >= 1400);
    }

    let t = 0;
    let minY = Infinity;
    let maxY = -Infinity;
    while (t < 30 && !world.done) {
      world.step(STEP);
      t += STEP;
      minY = Math.min(minY, shark.nodes[1]);
      maxY = Math.max(maxY, shark.nodes[1]);
    }

    assert.equal(world.done, true);
    assert.ok(t > 7 && t < 14, `traversée en ${t.toFixed(1)} s`);
    assert.ok(minY > 0 && maxY < 300, `tête entre ${minY.toFixed(0)} et ${maxY.toFixed(0)}`);
  });
}

test('un monde de récif ne contient que des poissons tropicaux, et pas de requin', () => {
  const world = new World([], { fishCount: 30, species: TROPICAL });
  world.resize(1200, 900, 10, 15);
  for (let t = 0; t < 5; t += STEP) world.step(STEP);
  assert.equal(world.sharks.length, 0);
  assert.equal(world.fish.length, 30);
  assert.ok(world.fish.every((f) => f.alive && TROPICAL[f.species]?.glyphs));
  assert.equal(world.done, false);
});

test('un redimensionnement garde les poissons du récif à leur place', () => {
  const world = new World([], { fishCount: 12, species: TROPICAL });
  world.resize(1200, 900, 10, 15);
  for (let t = 0; t < 1; t += STEP) world.step(STEP);
  const before = world.fish.map((f) => [f.x, f.y]);
  world.resize(1200, 920, 10, 15);
  assert.deepEqual(world.fish.map((f) => [f.x, f.y]), before);
});

test('un redimensionnement ne relance pas la traversée', () => {
  const world = new World([{ kind: 'classic', size: 1 }], { fishCount: 0, crossing: { dir: 1, duration: 10 } });
  world.resize(1400, 300, 11, 16);
  for (let t = 0; t < 3; t += STEP) world.step(STEP);
  const head = world.sharks[0].nodes[0];
  world.resize(1400, 310, 11, 16);
  assert.equal(world.sharks[0].nodes[0], head);
});
