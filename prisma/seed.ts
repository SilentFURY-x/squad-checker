import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const players = [
    { PlayerID: 'S001', Student: 'Aditi Rao', Position: 'GOALKEEPER', Cohort: 'YEAR_2', Availability: 'AVAILABLE', Selected: 'Yes' },
    { PlayerID: 'S002', Student: 'Bilal Khan', Position: 'DEFENDER', Cohort: 'YEAR_2', Availability: 'AVAILABLE', Selected: 'Yes' },
    { PlayerID: 'S003', Student: 'Chitra Nair', Position: 'DEFENDER', Cohort: 'YEAR_3', Availability: 'AVAILABLE', Selected: 'Yes' },
    { PlayerID: 'S004', Student: 'Deepak Shah', Position: 'FORWARD', Cohort: 'YEAR_2', Availability: 'AVAILABLE', Selected: 'Yes' },
    { PlayerID: 'S005', Student: 'Esha Roy', Position: 'FORWARD', Cohort: 'YEAR_3', Availability: 'AVAILABLE', Selected: 'Yes' },
    { PlayerID: 'S006', Student: 'Farhan Das', Position: 'UTILITY', Cohort: 'YEAR_2', Availability: 'AVAILABLE', Selected: 'Yes' },
    { PlayerID: 'S007', Student: 'Gita Menon', Position: 'UTILITY', Cohort: 'YEAR_3', Availability: 'AVAILABLE', Selected: 'Yes' },
    { PlayerID: 'S008', Student: 'Harish Patel', Position: 'FORWARD', Cohort: 'YEAR_2', Availability: 'UNAVAILABLE', Selected: 'No' },
    { PlayerID: 'S009', Student: 'Imani Joseph', Position: 'GOALKEEPER', Cohort: 'YEAR_3', Availability: 'AVAILABLE', Selected: 'No' },
  ];

  const positions = ['GOALKEEPER', 'DEFENDER', 'FORWARD', 'UTILITY'];
  const cohorts = ['YEAR_2', 'YEAR_3'];
  const availabilities = ['AVAILABLE', 'UNAVAILABLE'];

  for (let i = 10; i <= 100; i++) {
    const id = `S${i.toString().padStart(3, '0')}`;
    players.push({
      PlayerID: id,
      Student: `Student ${i}`,
      Position: positions[Math.floor(Math.random() * positions.length)],
      Cohort: cohorts[Math.floor(Math.random() * cohorts.length)],
      Availability: availabilities[Math.floor(Math.random() * availabilities.length)],
      Selected: 'No'
    });
  }

  console.log(`Seeding ${players.length} players...`);

  for (const p of players) {
    await prisma.player.upsert({
      where: { PlayerID: p.PlayerID },
      update: p,
      create: p,
    });
  }

  console.log('Seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
