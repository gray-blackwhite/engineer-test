import { IDb } from '../db';
import { IRepository, WhereClause } from './repository.interface';
import { BaseEntity } from './types';

export abstract class BaseRepository<
  TDocument extends BaseEntity,
  TCreate,
  TUpdate extends BaseEntity & Partial<TCreate>
> implements IRepository<TDocument, TCreate, TUpdate> {
  public constructor(
    protected readonly db: IDb,
    protected readonly entityType: string
  ) {}

  public async read(args: { id: string }): Promise<TDocument> {
    return this.readOverride(args);
  }

  public async post(args: { record: TCreate }): Promise<TDocument> {
    return this.postOverride(args);
  }

  public async put(args: { record: TUpdate }): Promise<TDocument> {
    return this.putOverride(args);
  }

  public async query(args: { where: WhereClause<TCreate> }): Promise<TDocument[]> {
    return this.queryOverride(args);
  }

  protected async readOverride(args: { id: string }): Promise<TDocument> {
    const response = await this.db.read(args);
    return response.record as unknown as TDocument;
  }

  protected async postOverride(args: { record: TCreate }): Promise<TDocument> {
    const createResponse = await this.db.post({ record: { data: args.record as object } });
    const readResponse = await this.db.read({ id: createResponse.id });
    return readResponse.record as unknown as TDocument;
  }

  protected async putOverride(args: { record: TUpdate }): Promise<TDocument> {
    const { id, ...data } = args.record as { id: string } & Record<string, unknown>;
    const updateResponse = await this.db.put({ record: { id, data } });
    const readResponse = await this.db.read({ id: updateResponse.id });
    return readResponse.record as unknown as TDocument;
  }

  protected async queryOverride(args: { where: WhereClause<TCreate> }): Promise<TDocument[]> {
    const response = await this.db.query({
      type: this.entityType,
      where: args.where as { [propertyName: string]: string | number | Date | boolean },
    });

    return response.items as unknown as TDocument[];
  }
}
