const { db, batchWrite } = require('./_init.cjs');

(async () => {
    const usersSnap = await db.collection('users').get();
    const ops = [];

    for (const userDoc of usersSnap.docs) {
        const address  = userDoc.id;
        const xpSnap   = await userDoc.ref.collection('xpHistory').get();

        xpSnap.forEach(xp => {
            ops.push({
                ref:  db.collection('xpEntries').doc(xp.id),
                data: { ...xp.data(), user: address },
            });
        });
    }

    console.log(`XP entries to copy: ${ops.length}`);
    await batchWrite(ops);
    console.log('✅ XP migrated.');
})();
