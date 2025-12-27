import { IDb } from '../db';
import { BaseEntity, Division, DivisionDocument } from './types';
import { BaseRepository } from './base.repository';

export type DivisionCreate = Omit<Division, 'id'>;
export type DivisionUpdate = BaseEntity & Partial<DivisionCreate>;

export class DivisionRepository extends BaseRepository<DivisionDocument, DivisionCreate, DivisionUpdate> {
  public constructor(db: IDb) {
    super(db, 'division');
  }

  protected override putOverride(args: { record: DivisionUpdate }): Promise<DivisionDocument> {
    // TODO: Обновляем денормализованные данные в документе сотрудника, если отдел изменился
    return super.putOverride(args);
  }
}
