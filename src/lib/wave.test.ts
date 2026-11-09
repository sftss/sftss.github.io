import assert from 'node:assert/strict';
import { test } from 'node:test';
import { rippleAt } from './wave.ts';

test('une ondulation grandit et s\'efface', () => {
  const start = rippleAt(0, 40);
  const mid = rippleAt(0.5, 40);
  const end = rippleAt(1, 40);
  assert.equal(start.radius, 0);
  assert.ok(mid.radius > start.radius && end.radius > mid.radius);
  assert.equal(end.radius, 40);
  assert.ok(start.alpha > mid.alpha && mid.alpha > end.alpha);
  assert.equal(end.alpha, 0);
  assert.ok(start.width > end.width);
});

test('l\'âge d\'une ondulation est borné', () => {
  assert.deepEqual(rippleAt(-1, 40), rippleAt(0, 40));
  assert.deepEqual(rippleAt(5, 40), rippleAt(1, 40));
});
