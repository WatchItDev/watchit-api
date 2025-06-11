const { db, batchWrite } = require('./_init.cjs');

async function copyLikes(topCollection, targetType) {
    const topSnap = await db.collection(topCollection).get();
    const ops     = [];

    for (const doc of topSnap.docs) {
        const targetId  = doc.id;
        const likeSnap  = await doc.ref.collection('likes').get();

        likeSnap.forEach(like => {
            const user = like.id;
            const id   = `${user}_${targetId}`;
            ops.push({
                ref: db.collection('likes').doc(id),
                data: {
                    author: user,
                    targetId,
                    targetType,
                    createdAt: Date.now(),
                },
            });
        });
    }
    return ops;
}

(async () => {
    const ops = [
        ...await copyLikes('posts',    'POST'),
        ...await copyLikes('comments', 'COMMENT'),
    ];

    console.log(`Likes to copy: ${ops.length}`);
    await batchWrite(ops);
    console.log('✅ Likes migrated.');
})();
