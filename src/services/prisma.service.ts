import { Player, Position, Cohort, Availability, Selected } from '../types';
import { Player as PrismaPlayer } from '@prisma/client';

export class PrismaPlayerService {
  /**
   * Maps a Prisma Player model to the Domain Player model.
   * This centralizes the parsing and casting logic so the core validator 
   * doesn't depend on Prisma's specific schema types.
   */
  static toDomain(prismaPlayer: PrismaPlayer): Player {
    return {
      PlayerID: prismaPlayer.PlayerID,
      Student: prismaPlayer.Student,
      Position: prismaPlayer.Position as Position,
      Cohort: prismaPlayer.Cohort as Cohort,
      Availability: prismaPlayer.Availability as Availability,
      Selected: prismaPlayer.Selected as Selected,
    };
  }
}
