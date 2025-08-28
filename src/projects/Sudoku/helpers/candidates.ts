/**
 * Bitmask representing numbers 1-9 true/false
 * @example
 * (base 10)   5 = 000000101 (base 2) // candidates 1 & 3
 * (base 10) 480 = 111100000 (base 2) // candidates 9, 8, 7, & 6
 */
export type CandidateMask = number;

// left shift 9: -> 1000000000
// subtract 1:   -> 0111111111 (9 bits of 1)
export const ALL_CANDIDATES = (1 << 9) - 1;

export function hasCandidate(mask: CandidateMask, num: number) {
  const numMask = 1 << (num - 1);
  return (mask & numMask) !== 0;
}

export function toggleCandidate(mask: CandidateMask, num: number) {
  const numMask = 1 << (num - 1);
  return mask ^ numMask;
}

export function addCandidate(mask: CandidateMask, num: number) {
  const numMask = 1 << (num - 1);
  return mask | numMask;
}

export function removeCandidate(mask: CandidateMask, num: number) {
  const numMask = 1 << (num - 1);
  return mask & ~numMask;
}

export function candidateMaskToList(mask: CandidateMask) {
  const result: (number | null)[] = [];
  for (let i = 0; i < 9; i++) {
    const numMask = 1 << i;
    result.push(mask & numMask ? i + 1 : null);
  }
  return result;
}
