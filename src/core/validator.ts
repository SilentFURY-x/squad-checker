import { Player, ValidationResult, ValidationCounts } from '../types';

export class SquadValidator {
  static validate(roster: Player[], selectedIds: string[]): ValidationResult {
    const emptyCounts: ValidationCounts = {
      size: 0,
      goalkeeper: 0,
      defender: 0,
      forward: 0,
      utility: 0,
      YEAR_2: 0,
      YEAR_3: 0,
    };

    // 1. Check for unknown or repeated IDs
    const idSet = new Set<string>();
    let hasInvalidReference = false;

    for (const id of selectedIds) {
      if (idSet.has(id)) {
        hasInvalidReference = true;
        break;
      }
      const playerExists = roster.some((p) => p.PlayerID === id);
      if (!playerExists) {
        hasInvalidReference = true;
        break;
      }
      idSet.add(id);
    }

    if (hasInvalidReference) {
      return {
        status: 'INVALID',
        violations: ['INVALID_SELECTION_REFERENCE'],
        counts: { ...emptyCounts },
      };
    }

    // Get selected players in roster order
    const selectedPlayers = roster.filter((p) => idSet.has(p.PlayerID));

    const counts: ValidationCounts = {
      size: selectedIds.length,
      goalkeeper: 0,
      defender: 0,
      forward: 0,
      utility: 0,
      YEAR_2: 0,
      YEAR_3: 0,
    };

    // Calculate counts
    for (const player of selectedPlayers) {
      if (player.Position === 'GOALKEEPER') counts.goalkeeper++;
      if (player.Position === 'DEFENDER') counts.defender++;
      if (player.Position === 'FORWARD') counts.forward++;
      if (player.Position === 'UTILITY') counts.utility++;
      
      if (player.Cohort === 'YEAR_2') counts.YEAR_2++;
      if (player.Cohort === 'YEAR_3') counts.YEAR_3++;
    }

    const violations: string[] = [];

    // Order of rules:
    // 1. SQUAD_SIZE_MUST_BE_7
    if (counts.size !== 7) {
      violations.push('SQUAD_SIZE_MUST_BE_7');
    }

    // 2. GOALKEEPER_COUNT_MUST_BE_1
    if (counts.goalkeeper !== 1) {
      violations.push('GOALKEEPER_COUNT_MUST_BE_1');
    }

    // 3. MINIMUM_DEFENDERS_NOT_MET (at least 2)
    if (counts.defender < 2) {
      violations.push('MINIMUM_DEFENDERS_NOT_MET');
    }

    // 4. MINIMUM_FORWARDS_NOT_MET (at least 2)
    if (counts.forward < 2) {
      violations.push('MINIMUM_FORWARDS_NOT_MET');
    }

    // 5. PLAYER_UNAVAILABLE: <ID> (in roster order)
    for (const player of selectedPlayers) {
      if (player.Availability === 'UNAVAILABLE') {
        violations.push(`PLAYER_UNAVAILABLE: ${player.PlayerID}`);
      }
    }

    // 6. COHORT_LIMIT_EXCEEDED: <cohort> has <count>, maximum 4 (YEAR_2, YEAR_3 order)
    if (counts.YEAR_2 > 4) {
      violations.push(`COHORT_LIMIT_EXCEEDED: YEAR_2 has ${counts.YEAR_2}, maximum 4`);
    }
    if (counts.YEAR_3 > 4) {
      violations.push(`COHORT_LIMIT_EXCEEDED: YEAR_3 has ${counts.YEAR_3}, maximum 4`);
    }

    return {
      status: violations.length === 0 ? 'VALID' : 'INVALID',
      violations,
      counts,
    };
  }
}
