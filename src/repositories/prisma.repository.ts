import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PlayerRepository } from './interface';
import { Player } from '../types';
import { PrismaPlayerService } from '../services/prisma.service';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export class PrismaPlayerRepository implements PlayerRepository {
  async getAllPlayers(): Promise<Player[]> {
    const players = await prisma.player.findMany({
      orderBy: { PlayerID: 'asc' },
    });
    return players.map(PrismaPlayerService.toDomain);
  }

  async getPlayersByIds(ids: string[]): Promise<Player[]> {
    const players = await prisma.player.findMany({
      where: {
        PlayerID: { in: ids },
      },
      orderBy: { PlayerID: 'asc' },
    });
    return players.map(PrismaPlayerService.toDomain);
  }
}
