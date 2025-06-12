export async function toggle(
    isOn: () => Promise<boolean>,
    add:  (() => Promise<unknown>) | Array<() => Promise<unknown>>,
    del:  (() => Promise<unknown>) | Array<() => Promise<unknown>>
): Promise<boolean> {
    const run = (fns: any) => Promise.all((Array.isArray(fns) ? fns : [fns]).map(fn => fn()));
    if (await isOn()) { await run(del); return false; }
    await run(add);     return true;
}
