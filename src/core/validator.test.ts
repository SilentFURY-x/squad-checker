import { describe, it, expect } from 'vitest';
import { SquadValidator } from './validator';
import { TEST_ROSTER } from '../data/exampleRoster';

describe('SquadValidator', () => {
  it('Required: Load the built-in selection in one action and show VALID', () => {
    const selectedIds = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07'];
    const result = SquadValidator.validate(TEST_ROSTER, selectedIds);
    
    expect(result.status).toBe('VALID');
    expect(result.violations).toHaveLength(0);
    expect(result.counts.size).toBe(7);
    expect(result.counts.goalkeeper).toBe(1);
    expect(result.counts.defender).toBe(2);
    expect(result.counts.forward).toBe(2);
    expect(result.counts.utility).toBe(2);
    expect(result.counts.YEAR_2).toBe(4);
    expect(result.counts.YEAR_3).toBe(3);
  });

  it('Required: Replace only S07 with S08; show INVALID with specific ordered violations', () => {
    const selectedIds = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S08'];
    const result = SquadValidator.validate(TEST_ROSTER, selectedIds);
    
    expect(result.status).toBe('INVALID');
    expect(result.violations).toEqual([
      'PLAYER_UNAVAILABLE: S08',
      'COHORT_LIMIT_EXCEEDED: YEAR_2 has 5, maximum 4'
    ]);
  });

  it('Required: Reset, then deselect only S07; show squad size 6 and exactly SQUAD_SIZE_MUST_BE_7', () => {
    const selectedIds = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06'];
    const result = SquadValidator.validate(TEST_ROSTER, selectedIds);
    
    expect(result.status).toBe('INVALID');
    expect(result.violations).toEqual(['SQUAD_SIZE_MUST_BE_7']);
    expect(result.counts.size).toBe(6);
  });

  it('handles unknown or repeated references properly', () => {
    const resultUnknown = SquadValidator.validate(TEST_ROSTER, ['S01', 'S02', 'UNKNOWN']);
    expect(resultUnknown.status).toBe('INVALID');
    expect(resultUnknown.violations).toEqual(['INVALID_SELECTION_REFERENCE']);
    expect(resultUnknown.counts.size).toBe(0);

    const resultDuplicate = SquadValidator.validate(TEST_ROSTER, ['S01', 'S02', 'S02']);
    expect(resultDuplicate.status).toBe('INVALID');
    expect(resultDuplicate.violations).toEqual(['INVALID_SELECTION_REFERENCE']);
  });
});
