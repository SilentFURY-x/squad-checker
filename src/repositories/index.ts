import { PlayerRepository } from './interface';
import { PrismaPlayerRepository } from './prisma.repository';
import { HardcodedPlayerRepository } from './hardcoded.repository';

// Determine which provider to use. We check NEXT_PUBLIC_DATA_PROVIDER or DATA_PROVIDER.
const provider = process.env.DATA_PROVIDER || 'HARDCODED';

let playerRepository: PlayerRepository;

if (provider === 'DB') {
  playerRepository = new PrismaPlayerRepository();
} else {
  playerRepository = new HardcodedPlayerRepository();
}

export { playerRepository };
export * from './interface';
