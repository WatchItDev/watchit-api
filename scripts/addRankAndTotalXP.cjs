#!/usr/bin/env node
/* scripts/addRankAndSeedPerks.cjs
 * ------------------------------------------------------------------
 * ▸ Para TODOS los usuarios:
 *    - Crea (si no existe) el doc rankUser con su rango actual
 *    - Crea estados iniciales de todos los perks aplicables
 * ▸ No modifica currentRank ni xpTotal (ya están correctos)
 * -----------------------------------------------------------------*/

const path = require('node:path');
const { db } = require(path.resolve(__dirname, './_init.cjs'));

/* ─────────────  IMPORTACIONES DINÁMICAS (ESM)  ───────────── */
async function main () {
    /* DAO oficial (compilado) */
    const { FireStore } = await import(
        path.resolve(
            __dirname,
            '../src/functions/lib/src/externals/firebase/firestore.js',
        )
        );

    /* Data‑sources y processors */
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

    /* --------- Desactivamos cualquier emulador --------- */
    delete process.env.FIRESTORE_EMULATOR_HOST;
    delete process.env.FIRESTORE_EMULATOR_HOST_PATH;

    /* ---------- Store y singletons para los data‑sources ---------- */
    const { fs } = FireStore({ emulator: false }); // fuerza producción
    const store  = { fs };
    const ds     = DataSources(store);

    const activity = activityLogger({ ds });
    const ext      = { SynapseDS: { transfer: async () => {/* no‑op */} } };
    const rank     = rankEngine({ ds, ext, activity });   // (no se usa pero deja las deps satisfechas)

    /* ------------------------- MIGRACIÓN -------------------------- */
    const USERS = 'users';
    console.log('🔎  recuperando usuarios…');
    const snap  = await db.collection(USERS).get();
    const total = snap.size;
    console.log(`→ ${total} usuarios encontrados.`);

    /* helpers ---------------------------------------------------- */
    const allRanks = await ds.Ranks.catalog();               // lista de rangos
    const orderIdx = Object.fromEntries(allRanks.map(r => [r.id, r.order]));

    /* ----------- función que siembra perks para 1 usuario ----------- */
    const seedPerksForUser = async addr => {
        const u           = await ds.Users.getUser(addr);   // ya tiene currentRank
        const currentRank = u.currentRank;
        if (!currentRank) return;                           // safety‑net

        /* 1 · rankUser doc (idempotente) ------------------------------ */
        await ds.Ranks.addUserRank(addr, currentRank);

        /* 2 · perks --------------------------------------------------- */
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

        /* 2‑A ▸ instantáneos → AVAILABLE ------------------------------ */
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

        /* 2‑B ▸ semilla LOCKED para el resto ------------------------- */
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

    /* 3 ▸ Siembra para TODOS los usuarios -------------------------- */
    console.log('\n⚙️  sembrando estados de perks/ranks…');
    const CHUNK = 50;
    const uids  = snap.docs.map(d => d.id);          // todos los UID

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
