export interface DailyProgress {
    id:          string;   // windowKey = `<perkId>-<YYYYMMDD>`  o  `<perkId>-W<YYYY-WW>`
    user:        string;
    perkId:      string;
    progress:    number;
    target:      number;
    lastUpdated: number;
}
