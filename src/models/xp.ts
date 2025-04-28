export interface XPEntry {
    id?:            string;
    action:         string;
    description:    string;
    amount:         number;
    balanceBefore:  number;
    balanceAfter:   number;
    createdAt:      number;
}

export function makeXpEntry(p: {
    action:       string;
    description:  string;
    amount:       number;
    before:       number;
}): XPEntry {
    const now = Date.now();
    return {
        action:         p.action,
        description:    p.description,
        amount:         p.amount,
        balanceBefore:  p.before,
        balanceAfter:   p.before + p.amount,
        createdAt:      now,
    };
}
