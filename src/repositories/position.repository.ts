import { IDb } from '../db';
import { BaseEntity, Position, PositionDocument } from './types';
import { BaseRepository } from './base.repository';

export type PositionCreate = Omit<Position, 'id'>;
export type PositionUpdate = BaseEntity & Partial<PositionCreate>;

export class PositionRepository extends BaseRepository<PositionDocument, PositionCreate, PositionUpdate> {
  public constructor(db: IDb) {
    super(db, 'position');
  }

  protected override putOverride(args: { record: PositionUpdate }): Promise<PositionDocument> {
    // TODO: Обновляем денормализованные данные в документе сотрудника, если позиция изменилась
    return super.putOverride(args);
  }
}
