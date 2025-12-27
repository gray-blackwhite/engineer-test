import { IDb } from '../db';
import { BaseEntity, City, CityDocument } from './types';
import { BaseRepository } from './base.repository';

export type CityCreate = Omit<City, 'id'>;
export type CityUpdate = BaseEntity & Partial<CityCreate>;

export class CityRepository extends BaseRepository<CityDocument, CityCreate, CityUpdate> {
  public constructor(db: IDb) {
    super(db, 'city');
  }

  protected override putOverride(args: { record: CityUpdate }): Promise<CityDocument> {
    // TODO: Обновляем денормализованные данные в документе сотрудника, если город изменился
    return super.putOverride(args);
  }
}
