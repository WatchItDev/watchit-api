const path = require('node:path');
const { db } = require(path.resolve(__dirname, './_init.cjs'));

async function main () {
    const { FireStore } = await import(
        path.resolve(
            __dirname,
            '../src/functions/lib/src/externals/firebase/firestore.js',
        )
        );

    const { DataSources } = await import(
        path.resolve(__dirname, '../src/functions/lib/src/datasources/index.js')
        );
    const { activityLogger } = await import(
        path.resolve(
            __dirname,
            '../src/functions/lib/src/functions/processors/activity.js',
        )
        );
    const { rankEngine } = await import(
        path.resolve(
            __dirname,
            '../src/functions/lib/src/functions/processors/rank.js',
        )
        );

    delete process.env.FIRESTORE_EMULATOR_HOST;
    delete process.env.FIRESTORE_EMULATOR_HOST_PATH;

    const { fs } = FireStore({ emulator: false });
    const store  = { fs };
    const ds     = DataSources(store);

    const USERS = 'users';
    console.log('🔎  recuperando usuarios…');
    const snap  = await db.collection(USERS).get();
    const total = snap.size;
    console.log(`→ ${total} usuarios encontrados.`);

    const allRanks = await ds.Ranks.catalog();
    const orderIdx = Object.fromEntries(allRanks.map(r => [r.id, r.order]));

    const seedPerksForUser = async addr => {
        const u           = await ds.Users.getUser(addr);
        const currentRank = u.currentRank;
        if (!currentRank) return;

        await ds.Ranks.addUserRank(addr, currentRank);

        const catalog  = await ds.Perks.getCatalog();

        const instant = catalog.filter(
            p => p.unlockRule.on === 'RANK_UP' && p.unlockRule.rankId === currentRank,
        );

        const seedable = catalog.filter(
            p =>
                (orderIdx[p.minRankId] ?? 0) <= (orderIdx[currentRank] ?? 0) &&
                p.unlockRule.on !== 'RANK_UP',
        );

        const now = Date.now();

        await Promise.all(
            instant.map(p =>
                ds.Perks.upsertState({
                    user        : addr,
                    perkId      : p.id,
                    progress    : 0,
                    target      : 0,
                    status      : 'AVAILABLE',
                    availableAt : now,
                    cooldownSec : p.executionRule.type === 'ON_COOLDOWN'
                        ? p.executionRule.cooldownSec
                        : 0,
                }),
            ),
        );

        await Promise.all(
            seedable.map(async p => {
                const exists = await ds.Perks.getState(addr, p.id);
                if (exists) return;
                const initTarget =
                    p.unlockRule.on === 'ACTION_COUNT'
                        ? (p.unlockRule.times ?? 1)
                        : 1;
                await ds.Perks.upsertState({
                    user        : addr,
                    perkId      : p.id,
                    progress    : 0,
                    target      : initTarget,
                    status      : 'LOCKED',
                    availableAt : 0,
                    cooldownSec : p.executionRule.cooldownSec ?? 0,
                });
            }),
        );
    };

    console.log('\n⚙️  sembrando estados de perks/ranks…');
    const CHUNK = 50;
    const uids  = snap.docs.map(d => d.id);

    for (let i = 0; i < uids.length; i += CHUNK) {
        await Promise.all(
            uids.slice(i, i + CHUNK).map(seedPerksForUser),
        );
        console.log(
            `   → ${Math.min(i + CHUNK, uids.length)}/${uids.length}`,
        );
    }

    console.log('\n🎉  Migración completada sin errores.');
    process.exit(0);
}

main().catch(err => {
    console.error('❌  Falló la migración:', err);
    process.exit(1);
});
