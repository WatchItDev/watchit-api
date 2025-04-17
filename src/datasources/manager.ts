import { fs } from '@/externals/firebase/firestore';

export class DataSourceManager {
  constructor(protected store: any) {} // "store" kept for compatibility

  protected fs = fs; // <— re‑export generic factory
}
