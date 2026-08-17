import { Player } from '../types';

export interface PlayerRepository {
  /**
   * Fetch all available players from the data source.
   */
  getAllPlayers(): Promise<Player[]>;
  
  /**
   * Fetch specific players by their IDs.
   */
  getPlayersByIds(ids: string[]): Promise<Player[]>;
}
