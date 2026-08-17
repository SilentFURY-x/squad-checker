import DashboardClient from "./DashboardClient";
import { playerRepository } from "@/repositories";

export default async function DashboardPage() {
  // Data Fetching Layer
  // By using the generic `playerRepository` interface, the Dashboard remains completely
  // unaware of whether the data comes from Hardcoded memory or Prisma (PostgreSQL).
  // This honors the Dependency Inversion principle defined in Step 4.
  const players = await playerRepository.getAllPlayers();

  return <DashboardClient players={players} />;
}

