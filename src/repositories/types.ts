export interface BaseEntity {
  id: string;
}

export interface City extends BaseEntity {
  name: string;
}

export interface Division extends BaseEntity {
  name: string;
  cityUuid: string;
}

export interface Position extends BaseEntity {
  name: string;
}

export interface Employee extends BaseEntity {
  firstName: string;
  lastName: string;
  divisionId: string;
  cityId: string;
  positionId: string;
}

export interface CityDocument extends BaseEntity {
  data: City;
}

export interface DivisionDocument extends BaseEntity {
  data: Division;
}

export interface PositionDocument extends BaseEntity {
  data: Position;
}

export interface EmployeeDenormalizedFields {
  cityName: string;
  positionName: string;
  divisionName: string;
}

export interface EmployeeDocument extends BaseEntity {
  data: Employee & EmployeeDenormalizedFields;
}

export interface EmployeeWithCity {
  firstName: string;
  city: string;
}

export interface EmployeeWithPosition {
  firstName: string;
  position: string;
  division: string;
}
