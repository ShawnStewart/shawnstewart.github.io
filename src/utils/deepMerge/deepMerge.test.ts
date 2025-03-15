import { expect, it } from 'vitest';

import { deepMerge } from '.';

it('deepMerge: merges multiple objects', () => {
  const obj1 = { a: true };
  const obj2 = { b: true };
  const obj3 = { c: true };
  const result = deepMerge(obj1, obj2, obj3);
  expect(result).toEqual({ a: true, b: true, c: true });
});

it('deepMerge: overwrites primitive values', () => {
  const obj1 = { prop: true };
  const obj2 = { prop: 'string' };
  const obj3 = { prop: 123 };
  const result = deepMerge(obj1, obj2, obj3);
  expect(result).toEqual({ prop: 123 });
});

it('deepMerge: merges deeply nested objects', () => {
  const obj1 = { depth1: { depth2: { a: true, b: true } } };
  const obj2 = { depth1: { depth2: { b: 'string', c: 123 } } };
  const result = deepMerge(obj1, obj2);
  expect(result).toEqual({
    depth1: { depth2: { a: true, b: 'string', c: 123 } },
  });
});

it('deepMerge: concatenates arrays', () => {
  const obj1 = { a: [1, 2] };
  const obj2 = { a: [3, 4] };
  const result = deepMerge(obj1, obj2);
  expect(result).toEqual({
    a: [1, 2, 3, 4],
  });
});

it('deepMerge: handles null or undefined', () => {
  const obj1 = { a: true };
  const obj2 = { b: true };
  const obj3 = { c: true };
  const result = deepMerge(
    obj1,
    null as unknown as object,
    obj2,
    undefined as unknown as object,
    obj3,
  );
  expect(result).toEqual({ a: true, b: true, c: true });
});
