#!/usr/bin/env node
/* scripts/fixDailyClaimState.cjs
 * ------------------------------------------------------------------
 * ▸ Añade campos faltantes (id, collectedAt) a los docs
 *   userPerkState/*  donde perkId === 'daily-claim-xp'
 * -----------------------------------------------------------------*/

const path = require('node:path');
const { db } = require(path.resolve(__dirname, './_init.cjs'));

const STATE_COLL = 'userPerkState';
const PERK_ID    = 'daily-claim-xp';
const BATCH_MAX  = 400;
const now        = Date.now();

(async () => {
    try {
        console.log(`🔎  buscando docs con perkId == "${PERK_ID}" …`);
        const snap = await db
            .collection(STATE_COLL)
            .where('perkId', '==', PERK_ID)
            .get();

        const total = snap.size;
        if (!total) {
            console.log('✅  No se encontraron documentos para corregir.'); process.exit(0);
        }
        console.log(`→ ${total} documentos encontrados.`);

        let batch    = db.batch();
        let modified = 0;
        let inBatch  = 0;

        for (const doc of snap.docs) {
            const data = doc.data();
            const needsId         = data.id === undefined;
            const needsCollected  = data.collectedAt === undefined;

            if (!needsId && !needsCollected) continue; // nada que hacer

            const patch = { updatedAt: now };
            if (needsId)        patch.id         = doc.id;
            if (needsCollected) patch.collectedAt = null;

            batch.update(doc.ref, patch);
            modified++;
            if (++inBatch === BATCH_MAX) {
                await batch.commit();
                console.log(`   ↳ ${modified}/${total} corregidos…`);
                batch   = db.batch();
                inBatch = 0;
            }
        }

        if (inBatch) {
            await batch.commit();
        }

        console.log(`🎉  Corrección terminada. Total modificados: ${modified}/${total}.`);
        process.exit(0);
    } catch (err) {
        console.error('❌  Error durante la corrección:', err);
        process.exit(1);
    }
})();
