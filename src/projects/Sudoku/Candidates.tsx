import { type CandidateMask, candidateMaskToList } from './helpers/candidates';
import { Number } from './Number';

interface Props {
  candidateMask: CandidateMask;
}

export function Candidates({ candidateMask }: Props) {
  const candidates = candidateMaskToList(candidateMask);
  return candidates.map((candidate) => <Number key={candidate}>{candidate}</Number>);
}
