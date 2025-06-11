const { db, batchWrite } = require('./_init.cjs');

(async () => {
    const usersSnap = await db.collection('users').get();
    const ops = [];

    for (const userDoc of usersSnap.docs) {
        const address   = userDoc.id;
        const subSnap   = await userDoc.ref.collection('bookmarks').get();

        subSnap.forEach(sub => {
            const postId = sub.id;
            ops.push({
                ref:  db.collection('bookmarks').doc(`${address}_${postId}`),
                data: { author: address, postId, createdAt: Date.now() },
            });
        });
    }

    console.log(`Bookmarks to copy: ${ops.length}`);
    await batchWrite(ops);
    console.log('✅ Bookmarks migrated.');
})();
