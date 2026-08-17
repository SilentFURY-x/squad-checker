import { PlayerRepository } from './interface';
import { Player } from '../types';
import { TEST_ROSTER } from '../data/exampleRoster';

export class HardcodedPlayerRepository implements PlayerRepository {
  async getAllPlayers(): Promise<Player[]> {
    return TEST_ROSTER;
  }

  async getPlayersByIds(ids: string[]): Promise<Player[]> {
    const idSet = new Set(ids);
    return TEST_ROSTER.filter(p => idSet.has(p.PlayerID));
  }
}
