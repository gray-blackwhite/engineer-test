import { IDb } from '../db';
import { BaseEntity, Employee, EmployeeDenormalizedFields, EmployeeDocument } from './types';
import { BaseRepository } from './base.repository';

export type EmployeeCreate = Omit<Employee, 'id'>;
export type EmployeeUpdate = BaseEntity & Partial<EmployeeCreate>;

export class EmployeeRepository extends BaseRepository<EmployeeDocument, EmployeeCreate, EmployeeUpdate> {
  public constructor(
    db: IDb,
  ) {
    super(db, 'employee');
  }

  override async postOverride(args: { record: EmployeeCreate }): Promise<EmployeeDocument> {
    // Вместо прямой передачи в базовый метод, добавляем денормализованные данные в документ
    // TODO: Извлечь данные из базы данных для города, должности и департамента
    const recordWithDenormalizedData: EmployeeCreate & EmployeeDenormalizedFields = {
      ...args.record,
      cityName: '',
      positionName: '',
      divisionName: '',
    };
    const employee = await super.postOverride({ record: recordWithDenormalizedData });
    return employee;
  }

  protected override async putOverride(args: { record: EmployeeUpdate }): Promise<EmployeeDocument> {
    // Вместо прямой передачи в базовый метод, добавляем денормализованные данные в документ
    // TODO: Извлечь данные из базы данных для города, должности и департамента, если они изменились
    const recordWithDenormalizedData: EmployeeUpdate & Partial<EmployeeDenormalizedFields> = {
      ...args.record,
      // cityName: '',
      // positionName: '',
      // divisionName: '',
    };
    const employee = await super.putOverride({ record: recordWithDenormalizedData });
    return employee;
  }
}
