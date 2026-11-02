import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseRich, words } from './rich.ts';

test('parseRich isole un mot-clé au milieu d’une phrase', () => {
  assert.deepEqual(parseRich('Un an comme [[Data Analyst]] aux ATMB.'), [
    { text: 'Un an comme ', keyword: false },
    { text: 'Data Analyst', keyword: true },
    { text: ' aux ATMB.', keyword: false },
  ]);
});

test('parseRich gère un mot-clé en tête et plusieurs mots-clés', () => {
  assert.deepEqual(parseRich('[[Pragmatique et autonome]], avec [[Claude Code]] et [[encyClaupedia]].'), [
    { text: 'Pragmatique et autonome', keyword: true },
    { text: ', avec ', keyword: false },
    { text: 'Claude Code', keyword: true },
    { text: ' et ', keyword: false },
    { text: 'encyClaupedia', keyword: true },
    { text: '.', keyword: false },
  ]);
});

test('parseRich laisse un texte sans mot-clé intact', () => {
  assert.deepEqual(parseRich('Rien à signaler.'), [{ text: 'Rien à signaler.', keyword: false }]);
});

test('words garde les espaces et ne coupe pas sur l’espace insécable', () => {
  assert.deepEqual(words('à Lyon 2, je'), ['à', ' ', 'Lyon 2,', ' ', 'je']);
  assert.deepEqual(words(' Data Analyst'), [' ', 'Data', ' ', 'Analyst']);
});
