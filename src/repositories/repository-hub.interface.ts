import { IRepository } from './repository.interface';
import {
  CityDocument,
  DivisionDocument,
  PositionDocument,
  EmployeeDocument
} from './types';
import {
  CityCreate,
  CityUpdate,
  DivisionCreate,
  DivisionUpdate,
  PositionCreate,
  PositionUpdate,
  EmployeeCreate,
  EmployeeUpdate
} from './index';

export interface IRepositoryHub {
  readonly city: IRepository<CityDocument, CityCreate, CityUpdate>;
  readonly division: IRepository<DivisionDocument, DivisionCreate, DivisionUpdate>;
  readonly position: IRepository<PositionDocument, PositionCreate, PositionUpdate>;
  readonly employee: IRepository<EmployeeDocument, EmployeeCreate, EmployeeUpdate>;
}
