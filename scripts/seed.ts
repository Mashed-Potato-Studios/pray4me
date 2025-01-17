import { runGroupsSeeding } from '../lib/seed/groups';

const runSeed = async () => {
  try {
    const cleanup = process.argv.includes('--cleanup');
    await runGroupsSeeding(cleanup);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

runSeed();
