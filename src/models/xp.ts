export enum XpAction {
    REGISTER_BONUS   = 'REGISTER_BONUS',
    POST_CREATED     = 'POST_CREATED',
    COMMENT_CREATED  = 'COMMENT_CREATED',
    COMMENT_STREAK   = 'COMMENT_STREAK',
}

export interface XPEntry {
    id?:            string;
    user:           string
    action:         XpAction | string;
    description:    string;
    amount:         number;
    balanceBefore:  number;
    balanceAfter:   number;
    totalAfter:    number
    createdAt:      number;
}

export function makeXpEntry(p: {
    action:      XPEntry['action'];
    user:        string;
    description: string;
    amount:      number;
    before:      number;
    totalBefore: number;
}): XPEntry {
    const now = Date.now();
    const id  = `${p.user}-${now}`;
    const balanceAfter = p.before + p.amount;
    const totalAfter = p.totalBefore + (p.amount > 0 ? p.amount : 0)

    return {
        id,
        action:        p.action,
        user:          p.user,
        description:   p.description,
        amount:        p.amount,
        balanceBefore: p.before,
        balanceAfter,
        totalAfter,
        createdAt:     now,
    };
}
