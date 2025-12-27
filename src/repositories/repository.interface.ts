import { BaseEntity } from "./types";

export type WhereClause<T> = Partial<
{
  [K in keyof T as T[K] extends string | number | Date | boolean ? K : never]: T[K];
}>;

export interface IRepository<
  TDocument extends BaseEntity,
  TCreate,
  TUpdate extends BaseEntity & Partial<TCreate>
>{
  read(args: { id: string }): Promise<TDocument>;
  post(args: { record: TCreate }): Promise<TDocument>;
  put(args: { record: TUpdate }): Promise<TDocument>;
  query(args: { where: WhereClause<TCreate> }): Promise<TDocument[]>;
}
