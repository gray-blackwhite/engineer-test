import { IDb } from '../db';
import { IRepositoryHub } from './repository-hub.interface';
import { CityRepository, DivisionRepository, PositionRepository, EmployeeRepository } from './index';

export class RepositoryHubFactory {
  public static build(db: IDb): IRepositoryHub {
    // TODO: Реализовать фабричный метод для write heavy repository hub
    // ту или иную реализацию использовать по определенному условию
    return RepositoryHubFactory.createReadHeavyRepositoryHub(db);
  }

  private static createReadHeavyRepositoryHub(db: IDb): IRepositoryHub {
    return {
      city: new CityRepository(db),
      division: new DivisionRepository(db),
      position: new PositionRepository(db),
      employee: new EmployeeRepository(db),
    };
  }
}
