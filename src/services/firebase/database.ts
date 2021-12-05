import { get, push, ref, onValue, DataSnapshot } from 'firebase/database';

import { Database } from '@firebase/database';

export type Room = {
  key: string;
  authorId: string;
  roomName: string;
  questions: FireBaseCollection<Question>;
};

export type FireBaseCollection<T> = Record<string, T>;

export type Question = {
  key: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
};

export type Collection = {
  rooms: Room;
  questions: Question;
};

export type CollectionsKey = keyof Collection;

export type CollectionSchema<T extends CollectionsKey> = Partial<Collection[T]>;

export class DatabaseORM {
  constructor(private readonly connection: Database) {}

  private static instance: DatabaseORM;

  public static init(connection: Database) {
    if (!DatabaseORM.instance) {
      DatabaseORM.instance = new DatabaseORM(connection);

      return DatabaseORM.instance;
    }

    return DatabaseORM.instance;
  }

  public getRef = (refKey: string) => ref(this.connection, refKey);

  private getOneQuery = (keyId: string, collectionKey: string) =>
    get(this.getRef(`${collectionKey}/${keyId}`));

  public collection<CollectionRef extends CollectionsKey>(
    collectionKey: CollectionRef
  ) {
    const collection = this.getRef(collectionKey);

    return {
      save: async (values: CollectionSchema<CollectionRef>) =>
        push(collection, values),

      getOne: async (id: string) => this.getOneQuery(id, collectionKey),

      insert: async <CollectionRef extends CollectionsKey>(
        raw: string,
        value: CollectionSchema<CollectionRef>
      ) => push(this.getRef(`${collectionKey}/${raw}`), value),

      query: async (query: string) =>
        get(this.getRef(`${collectionKey}/${query}`)),

      on: (query: string, listener: (value: DataSnapshot) => void) =>
        onValue(this.getRef(`${collectionKey}/${query}`), listener),
    };
  }
}
