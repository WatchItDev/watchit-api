export enum XpAction {
    REGISTER_BONUS   = 'REGISTER_BONUS',
    POST_CREATED     = 'POST_CREATED',
    COMMENT_CREATED  = 'COMMENT_CREATED',
    COMMENT_STREAK   = 'COMMENT_STREAK',
}

export interface XPEntry {
    id?:            string;
    action:         XpAction | string;
    description:    string;
    amount:         number;
    balanceBefore:  number;
    balanceAfter:   number;
    createdAt:      number;
}

export function makeXpEntry(p: {
    action:      XPEntry['action'];
    description: string;
    amount:      number;
    before:      number;
}): XPEntry {
    const now = Date.now();
    return {
        action:        p.action,
        description:   p.description,
        amount:        p.amount,
        balanceBefore: p.before,
        balanceAfter:  p.before + p.amount,
        createdAt:     now,
    };
}
