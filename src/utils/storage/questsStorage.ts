export type TQuestStorage = {
  quests: {
    [questId: string]: {
      done: boolean;
    };
  };
  lastInteract: number;
};

export class StorageQuest {
  public storageKey: string = "";
  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }
  public getStorage() {
    let storageStringify: string | null = "";
    if (typeof window !== "undefined") {
      storageStringify = window?.localStorage.getItem(this.storageKey);
    }

    //init here
    if (!storageStringify) {
      this.initEmptyStorage();
      return { quests: {}, lastInteract: Date.now() } as TQuestStorage;
    } else {
      //check timestamp
      const res = JSON.parse(localStorage.getItem(this.storageKey) || "{}") as TQuestStorage;
      //reinit storage if expired 1 day
      const timeStampDate = new Date(res.lastInteract || 0);
      const timeStampDay = timeStampDate.getDate();
      const timeStampMonth = timeStampDate.getDate();
      const timeStampYear = timeStampDate.getDate();
      const now = new Date();
      const currentDay = now.getDate();
      const currentMonth = now.getDate();
      const currentYear = now.getDate();
      const isExpired =
        (currentYear - timeStampYear) * 365 +
          (currentMonth - timeStampMonth) * 30 +
          (currentDay - timeStampDay) >=
        1;
      if (isExpired) {
        //init new storage
        this.initEmptyStorage();
        return { quests: {}, lastInteract: Date.now() } as TQuestStorage;
      } else {
        return res;
      }
    }
  }
  public initEmptyStorage() {
    if (typeof window !== "undefined") {
      return window.localStorage.setItem(
        this.storageKey,
        JSON.stringify({ quests: {}, lastInteract: Date.now() })
      );
    }
  }
  public setStorage(data: TQuestStorage) {
    return localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  public editTQuestStorage(id: string, payload: Partial<TQuestStorage["quests"][string]>) {
    const storageData = this.getStorage();
    storageData["quests"][id] = { ...storageData["quests"][id], ...payload };
    storageData.lastInteract = Date.now();
    this.setStorage(storageData);
  }

  public deleteStorage() {
    localStorage.removeItem(this.storageKey);
  }
}

export const QuestStorage = new StorageQuest("centic-airdrop-quests");

export const setQuestStorage = () => {};
export const getQuestStorage = () => {};
