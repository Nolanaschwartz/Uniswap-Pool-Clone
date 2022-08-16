import Dexie, { Table } from "dexie";

export interface watchedPool {
  id: string;
}

export class watchedPoolsDB extends Dexie {
  pools!: Table<watchedPool>;

  constructor() {
    super("watchedPoolsDB");
    this.version(1).stores({
      pools: "id",
    });
  }

  addPool(id: string) {
    return this.transaction("rw", this.pools, () => {
      return this.pools.add({ id: id });
    });
  }

  removePool(id: string) {
    return this.transaction("rw", this.pools, () => {
      return this.pools.delete(id);
    });
  }

  bulkAdd(pools) {
    return this.transaction("rw", this.pools, () => {
      const addPools = pools.map((comment) => ({
        id: comment.id,
      }));
      this.pools.bulkAdd(addPools);
    });
  }

  resetDB() {
    return this.transaction("rw", this.pools, () => {
      this.pools.clear();
    });
  }
}
export const watchedPools = new watchedPoolsDB();
