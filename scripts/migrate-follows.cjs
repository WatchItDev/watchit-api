const { db, batchWrite } = require('./_init.cjs');

(async () => {
    const usersSnap = await db.collection('users').get();
    const ops = [];

    for (const userDoc of usersSnap.docs) {
        const follower = userDoc.id;
        const subSnap  = await userDoc.ref.collection('following').get();

        subSnap.forEach(sub => {
            const following = sub.id;
            ops.push({
                ref:  db.collection('follows').doc(`${follower}_${following}`),
                data: { follower, following, createdAt: Date.now() },
            });
        });
    }

    console.log(`Follows to copy: ${ops.length}`);
    await batchWrite(ops);
    console.log('✅ Follows migrated.');
})();
